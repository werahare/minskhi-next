import Link from "next/link";

export function ProductCertificationCare() {
  return (
    <section className="mt-8 border border-[#ddcfbf] bg-[#fbfaf8] p-6">
      <h2 className="font-serif text-2xl text-ink">Certification, warranty and care</h2>
      <div className="mt-5 grid gap-5 text-sm leading-7 text-mink">
        <p>
          All Minskhi pieces are accompanied by certification from recognised independent
          gemmological laboratories, ensuring authenticity and quality. For more details, please
          visit our{" "}
          <Link className="text-[#092E2B] underline underline-offset-4" href="/minskhi-certifications">
            Certification page
          </Link>
          .
        </p>
        <p>
          Each product is also backed by a Minskhi warranty, reflecting our commitment to
          craftsmanship and long-term value.
        </p>
        <p>
          To preserve the beauty and brilliance of your gemstone, we provide detailed care guidance
          with every purchase, helping you protect and maintain your piece for generations.
        </p>
      </div>
    </section>
  );
}
