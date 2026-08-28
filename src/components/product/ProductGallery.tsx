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
  const safeImages = images.length ? images : videos.length ? [] : ["/assets/fallback-product.svg"];
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
              className={`relative aspect-square overflow-hidden rounded-sm border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092E2B]/35 focus-visible:ring-offset-2 ${
                active.src === item.src ? "border-[#092E2B]" : "border-[#e4d8ca] hover:border-[#092E2B]"
              }`}
              key={item.src}
              onClick={() => setActive(item)}
              type="button"
              aria-label={item.type === "video" ? `Play ${name} video` : `View ${name} image`}
            >
              {item.type === "video" ? (
                <span className="group/video flex h-full w-full flex-col items-center justify-center gap-1 bg-[linear-gradient(145deg,#10443f_0%,#082e2b_58%,#051f1d_100%)] text-white sm:gap-1.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 bg-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.24)] transition duration-300 group-hover/video:scale-105 group-hover/video:border-white group-hover/video:bg-white group-hover/video:text-[#092E2B] sm:h-9 sm:w-9 lg:h-10 lg:w-10">
                    <svg aria-hidden="true" className="h-3 w-3 translate-x-px fill-current sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24">
                      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                    </svg>
                  </span>
                  <span className="text-[7px] font-semibold uppercase leading-none tracking-[0.14em] text-white/85 sm:text-[8px] lg:text-[9px]">
                    Video
                  </span>
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
