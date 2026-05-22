import Image from "next/image";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact Us", "Contact Minskhi client care.", "/contact");

function ContactIcon({ type }: { type: "mail" | "phone" | "location" | "whatsapp" | "facebook" | "instagram" }) {
  const common = "h-5 w-5";
  const paths = {
    mail: (
      <>
        <path d="M3 6.5h18v11H3z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    phone: (
      <path d="M7.5 4.5 10 7l-1.8 2.2a12.8 12.8 0 0 0 6.6 6.6L17 14l2.5 2.5-1.2 3c-.3.8-1.1 1.2-2 1C9.8 19.1 4.9 14.2 3.5 7.7c-.2-.9.2-1.7 1-2z" />
    ),
    location: (
      <>
        <path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12Z" />
        <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </>
    ),
    whatsapp: (
      <path d="M4.6 19.4 6 15.7a7.5 7.5 0 1 1 2.8 2.6l-4.2 1.1Zm5.1-10.7c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.3 5.2 4.4 2.6.9 3.1.7 3.7.7.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4l-2.1-1c-.3-.1-.5-.2-.7.2l-.9 1.1c-.2.2-.3.3-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-.8-2.1Z" />
    ),
    facebook: (
      <path d="M14 8h2V5h-2.4c-2.7 0-4.1 1.6-4.1 4v2H7v3h2.5v7H13v-7h2.6l.4-3h-3V9.3c0-.8.3-1.3 1-1.3Z" />
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M16.8 7.2h.01" />
      </>
    )
  };

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
        {paths[type]}
      </g>
    </svg>
  );
}

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`;

  return (
    <section className="container-shell py-14">
      <div className="mb-12 border-b border-[#ddcfbf] pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Client Care</p>
        <h1 className="mt-3 font-serif text-5xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-5xl text-sm leading-7 text-mink">
          For enquiries, appointments, product information, or aftercare assistance, please contact the Minskhi client care team.
        </p>
      </div>

      <div className="mb-10 overflow-hidden border border-[#ddcfbf] bg-white p-3">
        <div className="relative min-h-[320px]">
          <Image
            src="/wp-content/uploads/2024/02/DSC0150-scaled.jpg"
            alt="Minskhi client care"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-[#ddcfbf] bg-white p-7">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-[#ddcfbf] text-[#092E2B]">
            <ContactIcon type="mail" />
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Email</p>
          <h2 className="mt-3 font-serif text-2xl text-ink">Client Care</h2>
          <a className="mt-4 block text-sm leading-7 text-mink transition hover:text-[#092E2B]" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
        <div className="border border-[#ddcfbf] bg-white p-7">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-[#ddcfbf] text-[#092E2B]">
            <ContactIcon type="phone" />
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Phone</p>
          <h2 className="mt-3 font-serif text-2xl text-ink">Call Minskhi</h2>
          <a className="mt-4 block text-sm leading-7 text-mink transition hover:text-[#092E2B]" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            {siteConfig.phone}
          </a>
        </div>
        <div className="border border-[#ddcfbf] bg-white p-7">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-[#ddcfbf] text-[#092E2B]">
            <ContactIcon type="location" />
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Address</p>
          <h2 className="mt-3 font-serif text-2xl text-ink">Visit Us</h2>
          <p className="mt-4 text-sm leading-7 text-mink">
            Chadstone Shopping Centre,
            <br />
            Lower Ground Level,
            <br />
            1341 Dandenong Rd,
            <br />
            Melbourne Victoria 3145 Australia.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a
          className="inline-flex h-12 items-center justify-center gap-3 bg-[#092E2B] px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-ink"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <ContactIcon type="whatsapp" />
          WhatsApp
        </a>
        <a
          className="inline-flex h-12 items-center justify-center gap-3 border border-[#ddcfbf] bg-white px-6 text-xs uppercase tracking-[0.18em] text-mink transition hover:border-[#092E2B] hover:bg-[#092E2B] hover:text-white"
          href={siteConfig.facebook}
          rel="noreferrer"
          target="_blank"
        >
          <ContactIcon type="facebook" />
          Facebook
        </a>
        <a
          className="inline-flex h-12 items-center justify-center gap-3 border border-[#ddcfbf] bg-white px-6 text-xs uppercase tracking-[0.18em] text-mink transition hover:border-[#092E2B] hover:bg-[#092E2B] hover:text-white"
          href={siteConfig.instagram}
          rel="noreferrer"
          target="_blank"
        >
          <ContactIcon type="instagram" />
          Instagram
        </a>
      </div>
    </section>
  );
}
