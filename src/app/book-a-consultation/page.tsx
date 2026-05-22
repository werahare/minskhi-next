import { ConsultationForm } from "@/components/enquiry/ConsultationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Book a Consultation",
  "Schedule a personal Minskhi consultation.",
  "/book-a-consultation"
);

export default function ConsultationPage() {
  return (
    <section className="bg-[#f8f5ef]">
      <div className="container-shell py-10 lg:py-14">
        <div className="border-b border-[#ddcfbf] pb-8 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#092E2B]">Private appointment</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
            Book a Consultation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mink">
          Schedule a personal consultation to discuss your bespoke jewellery needs.
          </p>
        </div>
        <div className="grid gap-8 py-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
          <aside className="border border-[#d8cbbb] bg-white p-7 shadow-[0_18px_60px_rgba(36,28,19,0.05)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#9a8262]">Minskhi client care</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-ink">
              Personal guidance for your selection.
            </h2>
            <p className="mt-5 text-sm leading-7 text-mink">
              Share your preferred consultation method and a short note about what you are looking
              for. The Minskhi team will follow up privately by email.
            </p>
            <div className="mt-7 grid gap-4 border-t border-[#eadfd3] pt-6 text-sm leading-6 text-mink">
              <p>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-[#092E2B]">
                  Consultation options
                </span>
                Video, phone, or email appointment.
              </p>
              <p>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-[#092E2B]">
                  Best for
                </span>
                Bespoke jewellery, gemstone guidance, and private product enquiries.
              </p>
            </div>
          </aside>
          <div className="border border-[#d8cbbb] bg-white p-5 shadow-[0_22px_70px_rgba(36,28,19,0.06)] sm:p-7 lg:p-9">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
