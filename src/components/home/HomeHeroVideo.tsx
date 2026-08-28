"use client";

import { useEffect, useRef } from "react";

const mobileMediaQuery = "(max-width: 767px)";
const mobileOpeningEndTime = 5.75;

export function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = () => window.matchMedia(mobileMediaQuery).matches;
    const restartMobileVideo = () => {
      if (!isMobile()) return;

      video.currentTime = 0;
      void video.play().catch(() => {
        // Mobile browsers may defer autoplay until the page is visible.
      });
    };
    const keepMobileVideoOnOpening = () => {
      if (isMobile() && video.currentTime >= mobileOpeningEndTime) {
        restartMobileVideo();
      }
    };
    const restartWhenVisible = () => {
      if (document.visibilityState === "visible") restartMobileVideo();
    };

    video.addEventListener("loadedmetadata", restartMobileVideo);
    video.addEventListener("timeupdate", keepMobileVideoOnOpening);
    window.addEventListener("pageshow", restartMobileVideo);
    document.addEventListener("visibilitychange", restartWhenVisible);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restartMobileVideo();
    }

    return () => {
      video.removeEventListener("loadedmetadata", restartMobileVideo);
      video.removeEventListener("timeupdate", keepMobileVideoOnOpening);
      window.removeEventListener("pageshow", restartMobileVideo);
      document.removeEventListener("visibilitychange", restartWhenVisible);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      <source src="/wp-content/uploads/2026/03/Slider.mp4" type="video/mp4" />
    </video>
  );
}
