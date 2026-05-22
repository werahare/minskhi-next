import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-[#092E2B] text-[11px] uppercase tracking-[0.06em] text-white">
      <div className="minskhi-topbar-inner">
        <Link className="hover:text-white/75" href="/book-a-consultation">
          10% Off With SMS Or Email Sign Up
        </Link>
        <Link className="hover:text-white/75" href="/book-a-consultation">
          Join the Minskhi Circle
        </Link>
      </div>
    </div>
  );
}
