"use client";

import Image from "next/image";
import { useState } from "react";
import { productImage } from "@/lib/images";

type GalleryMedia =
  | {
      type: "image";
      src: string;
    }
  | {
      type: "video";
      src: string;
    };

export function ProductGallery({
  images,
  videos = [],
  name
}: {
  images: string[];
  videos?: string[];
  name: string;
}) {
  const safeImages = images.length ? images : ["/assets/fallback-product.svg"];
  const media: GalleryMedia[] = [
    ...safeImages.map((src) => ({ type: "image" as const, src })),
    ...videos.map((src) => ({ type: "video" as const, src }))
  ];
  const [active, setActive] = useState<GalleryMedia>(media[0]);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eee4d8]">
        {active.type === "video" ? (
          <video
            key={active.src}
            className="h-full w-full bg-black object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src={active.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={productImage(active.src)}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      {media.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {media.slice(0, 12).map((item) => (
            <button
              className={`relative aspect-square overflow-hidden border ${
                active.src === item.src ? "border-ink" : "border-transparent"
              }`}
              key={item.src}
              onClick={() => setActive(item)}
              type="button"
              aria-label={item.type === "video" ? `Play ${name} video` : `View ${name} image`}
            >
              {item.type === "video" ? (
                <span className="group/video flex h-full w-full flex-col items-center justify-center gap-2 bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] text-white">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition group-hover/video:bg-white group-hover/video:text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
                    <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">Video</span>
                </span>
              ) : (
                <Image src={productImage(item.src)} alt="" fill sizes="120px" className="object-cover" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
