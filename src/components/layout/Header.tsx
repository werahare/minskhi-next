"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readEnquiryItems } from "@/lib/enquiry";
import { AnnouncementBar } from "./AnnouncementBar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Gemstone", href: "/gemstones" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "Minerals", href: "/minerals" },
  { label: "Book a consultation", href: "/book-a-consultation" },
  { label: "Journal", href: "/journal" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const update = () =>
      setCount(readEnquiryItems().reduce((total, item) => total + item.quantity, 0));
    update();
    window.addEventListener("storage", update);
    window.addEventListener("minskhi-enquiry-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("minskhi-enquiry-updated", update);
    };
  }, []);

  return (
    <header
      className={
        isHome
          ? "absolute left-0 top-0 z-50 w-full text-white"
          : "sticky top-0 z-50 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      }
    >
      {isHome ? null : <AnnouncementBar />}
      <div
        className={
          isHome
            ? "mx-auto grid min-h-[126px] w-full max-w-[1640px] grid-cols-[260px_1fr_220px] items-start gap-8 px-8 pt-9 sm:px-12 lg:px-20 xl:px-[100px]"
            : "minskhi-main-header-inner"
        }
      >
        <button
          className={isHome ? "mt-3 lg:hidden" : "lg:hidden"}
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          type="button"
        >
          <span className={isHome ? "block h-px w-7 bg-white" : "block h-px w-7 bg-ink"} />
          <span className={isHome ? "mt-2 block h-px w-7 bg-white" : "mt-2 block h-px w-7 bg-ink"} />
        </button>
        <Link href="/" className="justify-self-center lg:justify-self-start">
          <Image
            src="/wp-content/uploads/2024/01/minskhi.png"
            alt="Minskhi"
            width={2048}
            height={590}
            priority
            className={isHome ? "h-auto w-[190px]" : "h-auto w-[145px] sm:w-[175px] lg:w-[205px]"}
          />
        </Link>
        <nav
            className={
              isHome
              ? "hidden items-center justify-center gap-[40px] pt-[15px] text-[13px] font-normal uppercase tracking-[0.035em] text-white lg:flex"
              : "minskhi-main-nav"
            }
        >
          <Link className={isHome ? "transition hover:text-white/75" : "transition hover:text-coral"} href="/">
            Home
          </Link>
          <div className={isHome ? "group relative py-0" : "group relative py-8"}>
            <Link
              className={isHome ? "inline-flex items-center gap-2 transition hover:text-white/75" : "transition hover:text-coral"}
              href="/collection"
            >
              <span>Collection</span>
              <span aria-hidden="true" className="text-[16px] leading-none">
                &#8964;
              </span>
            </Link>
            <div className="invisible absolute left-0 top-full z-20 min-w-48 border border-[#e9e9e9] bg-white py-3 text-ink opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              <Link className="block px-5 py-2 hover:text-coral" href="/gemstones">
                Gemstone
              </Link>
              <Link className="block px-5 py-2 hover:text-coral" href="/jewellery">
                Jewellery
              </Link>
              <Link className="block px-5 py-2 hover:text-coral" href="/minerals">
                Minerals
              </Link>
            </div>
          </div>
          <Link
            className={isHome ? "whitespace-nowrap transition hover:text-white/75" : "whitespace-nowrap text-[#ef4056] transition hover:text-coral"}
            href="/book-a-consultation"
          >
            Book a consultation
          </Link>
          <Link className={isHome ? "transition hover:text-white/75" : "transition hover:text-coral"} href="/journal">
            Journal
          </Link>
        </nav>
        <div
          className={
            isHome
              ? "hidden items-center justify-end gap-[26px] pt-[13px] text-white lg:flex"
              : "minskhi-header-actions"
          }
        >
          <Link href="/contact" aria-label="Account" className="transition hover:opacity-70">
            <UserIcon />
          </Link>
          <Link href="/shop-2" aria-label="Search" className="transition hover:opacity-70">
            <SearchIcon />
          </Link>
          <Link href="/enquiry-list" aria-label="Wishlist" className="transition hover:opacity-70">
            <HeartIcon />
          </Link>
          <Link href="/enquiry-list" aria-label="Enquiry list" className="relative transition hover:opacity-70">
            <BagIcon />
            <span className="absolute -right-[18px] -top-[17px] grid h-7 min-w-7 place-items-center rounded-full bg-[#082e2b] px-1 text-[14px] leading-none text-white">
              {count}
            </span>
          </Link>
        </div>
      </div>
      {open ? (
        <div className={isHome ? "bg-white/95 px-6 py-5 text-ink shadow-soft lg:hidden" : "border-t border-[#e9e9e9] bg-white px-6 py-5 lg:hidden"}>
          <nav className="grid gap-4 text-sm uppercase tracking-[0.18em] text-mink">
            {navItems.map((item) => (
              <Link onClick={() => setOpen(false)} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M12 12.2a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4Z" />
      <path d="M3.8 22c.7-4.5 3.7-7.2 8.2-7.2s7.5 2.7 8.2 7.2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <circle cx="10.8" cy="10.8" r="7.3" />
      <path d="m16.1 16.1 5 5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[23px] w-[23px]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M20.4 5.6c-1.9-1.9-5-1.8-6.8.2L12 7.5l-1.6-1.7c-1.8-2-4.9-2.1-6.8-.2-2 2-1.9 5.3.2 7.4L12 21l8.2-8c2.1-2.1 2.2-5.4.2-7.4Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M6.7 8.3h10.6l1 13H5.7l1-13Z" />
      <path d="M9 8.3V6a3 3 0 0 1 6 0v2.3" />
    </svg>
  );
}
