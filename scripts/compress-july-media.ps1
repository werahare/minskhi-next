$ErrorActionPreference = "Stop"

$mediaRoot = Join-Path $PSScriptRoot "..\public\wp-content\uploads\2026\07"
$ffmpeg = Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials*" -Recurse -Filter ffmpeg.exe -ErrorAction Stop | Select-Object -First 1 -ExpandProperty FullName
$logPath = Join-Path $PSScriptRoot "compress-july-media.log"

function Write-Log([string]$Message) {
  $line = "$(Get-Date -Format s) $Message"
  Add-Content -LiteralPath $logPath -Value $line
  Write-Output $line
}

$videos = Get-ChildItem -LiteralPath $mediaRoot -Recurse -File | Where-Object { $_.Extension -ieq ".mp4" }
$before = ($videos | Measure-Object Length -Sum).Sum
Write-Log "Starting $($videos.Count) videos ($([math]::Round($before / 1MB, 2)) MB)"

$groups = $videos | ForEach-Object {
  [pscustomobject]@{ File = $_; Hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash }
} | Group-Object Hash

$index = 0
foreach ($group in $groups) {
  $index++
  $source = $group.Group[0].File
  $temp = Join-Path $source.DirectoryName ($source.BaseName + ".compressed.mp4")
  Write-Log "[$index/$($groups.Count)] Encoding $($source.FullName) ($([math]::Round($source.Length / 1MB, 2)) MB); copies=$($group.Count)"

  & $ffmpeg -hide_banner -loglevel error -y -i $source.FullName -map 0:v:0 -map 0:a? -map_metadata 0 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a copy -movflags +faststart $temp
  if ($LASTEXITCODE -ne 0 -or !(Test-Path -LiteralPath $temp)) {
    throw "FFmpeg failed for $($source.FullName)"
  }

  $encoded = Get-Item -LiteralPath $temp
  if ($encoded.Length -ge $source.Length) {
    Remove-Item -LiteralPath $temp
    Write-Log "Kept original because encoded output was not smaller"
    continue
  }

  foreach ($entry in $group.Group) {
    Copy-Item -LiteralPath $temp -Destination $entry.File.FullName -Force
  }
  Remove-Item -LiteralPath $temp
  Write-Log "Reduced to $([math]::Round($encoded.Length / 1MB, 2)) MB"
}

$afterFiles = Get-ChildItem -LiteralPath $mediaRoot -Recurse -File | Where-Object { $_.Extension -ieq ".mp4" }
$after = ($afterFiles | Measure-Object Length -Sum).Sum
Write-Log "Complete: $([math]::Round($before / 1MB, 2)) MB -> $([math]::Round($after / 1MB, 2)) MB; saved $([math]::Round(($before - $after) / 1MB, 2)) MB"
