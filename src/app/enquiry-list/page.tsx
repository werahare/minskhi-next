import { EnquiryList } from "@/components/enquiry/EnquiryList";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Enquiry List", "Review selected Minskhi products.", "/enquiry-list");

export default function EnquiryListPage() {
  return (
    <section className="container-shell py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Private enquiry</p>
      <h1 className="mt-3 font-serif text-5xl">Enquiry List</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-mink">
        Review selected products, adjust quantities, and send Minskhi a formatted enquiry.
      </p>
      <div className="mt-10">
        <EnquiryList products={products} />
      </div>
    </section>
  );
}
