import { ConsultationForm } from "@/components/enquiry/ConsultationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Book a Consultation",
  "Schedule a personal Minskhi consultation.",
  "/book-a-consultation"
);

export default function ConsultationPage() {
  return (
    <section className="container-shell py-10">
      <div className="mb-8 border-b border-[#ddcfbf] pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Private appointment</p>
        <h1 className="mt-3 font-serif text-5xl">Book a Consultation</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-mink">
          Schedule a personal consultation to discuss your bespoke jewellery needs.
        </p>
      </div>
      <ConsultationForm />
    </section>
  );
}
