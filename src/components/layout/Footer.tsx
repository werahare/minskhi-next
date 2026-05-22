import Link from "next/link";
import { siteConfig } from "@/config/site";

const careLinks = [
  ["Policies", "/policies"],
  ["Website Terms of Service", "/website-terms-of-service"],
  ["Ring Size Guide", "/ring-size-guide"],
  ["Product Care", "/product-care"],
  ["FAQ", "/faq"]
];

const discoverLinks = [
  ["Our Story", "/our-story"],
  ["Journal", "/journal"],
  ["Contact Us", "/contact"],
  ["Reforestation and Youth Support", "/reforestation-and-youth-support"],
  ["Minskhi Certifications", "/minskhi-certifications"]
];

export function Footer() {
  return (
    <footer className="w-full bg-[#03110F] text-white">
      <section className="grid w-full gap-[60px] px-6 py-[90px] sm:px-10 lg:grid-cols-[30fr_20fr_20fr_30fr] xl:px-[100px]">
        <div>
          <h3 className="font-serif text-[20px] uppercase leading-none">Contact us</h3>
          <div className="mt-5 grid gap-[15px] text-[16px] leading-[1.55]">
            <div className="grid grid-cols-[39px_1fr] gap-[15px]">
              <LocationIcon />
              <p>
                Chadstone Shopping Centre,
                <br />
                Lower Ground Level,
                <br />
                1341 Dandenong Rd,
                <br />
                Melbourne Victoria 3145 Australia.
              </p>
            </div>
            <div className="grid grid-cols-[39px_1fr] gap-[15px]">
              <PhoneIcon />
              <Link className="transition hover:text-[#AAAAAA]" href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>
                {siteConfig.phone}
              </Link>
            </div>
            <div className="grid grid-cols-[39px_1fr] gap-[15px]">
              <MailIcon />
              <Link className="transition hover:text-[#AAAAAA]" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </Link>
            </div>
          </div>
          <div className="mt-5 flex gap-[10px]">
            <Link
              className="grid h-[45px] w-[45px] place-items-center rounded-full border border-white/20 text-[20px] transition hover:border-[#092E2B] hover:bg-[#092E2B]"
              href={siteConfig.facebook}
              aria-label="Facebook"
            >
              f
            </Link>
            <Link
              className="grid h-[45px] w-[45px] place-items-center rounded-full border border-white/20 transition hover:border-[#092E2B] hover:bg-[#092E2B]"
              href={siteConfig.instagram}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>

        <FooterLinkColumn title="Customer Care" links={careLinks} />
        <FooterLinkColumn title="Discover Minskhi" links={discoverLinks} />

        <div>
          <h3 className="font-serif text-[20px] uppercase leading-none">Join the Minskhi Circle</h3>
          <p className="mt-5 text-[16px]">Subscribe us</p>
          <form className="mt-5 flex h-[58px] bg-white text-black">
            <input
              className="min-w-0 flex-1 px-4 text-[16px] outline-none placeholder:text-[#7f8589]"
              placeholder="Enter your email address..."
              type="email"
            />
            <button
              className="grid w-[58px] place-items-center text-[24px] transition hover:bg-[#092E2B] hover:text-white"
              type="button"
              aria-label="Subscribe"
            >
              &#8594;
            </button>
          </form>
        </div>
      </section>

      <section className="w-full bg-[#03110F] px-6 pb-[30px] sm:px-10 xl:px-[100px]">
        <p className="w-full text-justify text-[12px] leading-[1.55] text-[#D8D8D8]">
          We at MINSKHI wish to acknowledge the Traditional Custodians of the land on which we operate
          and extend our respect to their Elders, past and present. We recognise the deep connection to
          the land, waters, and community of the Indigenous peoples of this area and commit to building
          a future that honors this relationship. We pay our respects to the ongoing living cultures of
          Aboriginal and Torres Strait Islander peoples, and acknowledge the important role Indigenous
          people continue to play within Australia. We stand in solidarity towards fostering an
          inclusive and respectful environment for all.
        </p>
      </section>

      <div className="bg-[#161616]">
        <div className="w-full px-6 py-[10px] text-[16px] text-[#505050] sm:px-10 xl:px-[100px]">
          &copy; 2026 Minskhi All rights reserved. | ABN {siteConfig.abn}
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="font-serif text-[20px] uppercase leading-none">{title}</h3>
      <ul className="mt-5 grid gap-[9px] text-[16px] leading-[1.45]">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link className="transition hover:text-[#AAAAAA]" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-5.3 7-12a7 7 0 1 0-14 0c0 6.7 7 12 7 12Z" />
      <path d="M12 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 4.5 5.7 6.8c-.8.8-.9 2-.2 3 2.1 3.4 5.3 6.6 8.7 8.7 1 .7 2.2.6 3-.2l2.3-2.3-4.1-3.1-1.7 1.7c-1.8-1-3.3-2.5-4.3-4.3l1.7-1.7L8 4.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h18v12H3V6Z" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M16.8 7.6h.01" />
    </svg>
  );
}
