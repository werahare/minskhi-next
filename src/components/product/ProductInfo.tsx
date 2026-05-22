import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Product } from "@/lib/types";
import { AddToEnquiryButton } from "@/components/enquiry/AddToEnquiryButton";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { ProductAttributeTable } from "@/components/product/ProductAttributeTable";

export function ProductInfo({ product }: { product: Product }) {
  const category = product.categories[0]?.replace(">", "/") ?? "Minskhi collection";

  return (
    <div className="lg:pl-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{category}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
      <p className="mt-4 text-sm text-mink">
        {product.sku ? `SKU ${product.sku}` : "SKU available on enquiry"}
      </p>
      {siteConfig.showPrices && product.price ? (
        <p className="mt-5 text-xl">${product.price}</p>
      ) : (
        <p className="mt-5 text-sm uppercase tracking-[0.18em] text-mink">Price on enquiry</p>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="text-sm uppercase tracking-[0.14em] text-mink" htmlFor="quantity">
          Quantity
        </label>
        <input
          id="quantity"
          className="h-12 w-20 border border-[#d5c6b6] bg-transparent px-3 text-center"
          min={1}
          defaultValue={1}
          type="number"
        />
        <AddToEnquiryButton slug={product.slug} className="min-w-[220px]" />
        <WishlistButton
          slug={product.slug}
          label
          className="min-h-12 px-5 text-xs uppercase tracking-[0.12em]"
        />
      </div>
      <section className="mt-16 border-t border-[#ddcfbf] pt-8">
        <h2 className="mb-5 font-serif text-3xl">Additional information</h2>
        <ProductAttributeTable product={product} />
      </section>
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
      <div className="mt-8 border-t border-[#ddcfbf] pt-6 text-sm leading-7 text-mink">
        <p>
          {product.shortDescription ||
            product.description ||
            "A selected Minskhi gemstone or jewellery piece available for private enquiry."}
        </p>
      </div>
      <p className="mt-6 border border-[#ddcfbf] bg-porcelain p-4 text-xs leading-6 text-mink">
        Please note that product images and videos are captured under controlled lighting conditions to
        highlight the beauty and detail of each gemstone. Colours and appearance may vary slightly in
        real life depending on lighting, environment, and screen settings.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm uppercase tracking-[0.16em] text-mink">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${siteConfig.url}/product/${product.slug}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#ddcfbf] bg-white px-4 py-2 font-semibold text-mink transition hover:border-ink hover:text-ink"
          aria-label="Share on Facebook"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.83c0-2.51 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12Z" />
          </svg>
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${product.name} ${siteConfig.url}/product/${product.slug}`)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#ddcfbf] bg-white px-4 py-2 font-semibold text-mink transition hover:border-ink hover:text-ink"
          aria-label="Share on WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current">
            <path d="M20.52 3.48A11.92 11.92 0 0 0 12 0C5.37 0 .01 5.37.01 12a11.9 11.9 0 0 0 1.67 6.01L0 24l6.27-1.63A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52Zm-7.7 17.22a9.6 9.6 0 0 1-5.18-1.5l-.37-.22-3.72.97.99-3.62-.24-.37a9.49 9.49 0 0 1 1.5-10.94 9.57 9.57 0 0 1 13.53 0 9.49 9.49 0 0 1-1.38 13.54 9.4 9.4 0 0 1-4.63 1.15Zm5.26-4.67c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15s-.76.94-.93 1.13c-.17.19-.34.22-.63.07-.29-.15-1.21-.45-2.31-1.43-.85-.75-1.43-1.68-1.6-1.97-.17-.3-.02-.46.13-.61.14-.14.29-.37.44-.55.15-.19.2-.32.3-.54.1-.22.05-.41-.02-.56-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01a1.28 1.28 0 0 0-.95.45c-.33.36-1.26 1.24-1.26 3.03 0 1.78 1.29 3.49 1.47 3.73.17.24 2.55 3.89 6.18 5.45 3.63 1.56 3.63 1.04 4.29.98.66-.05 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.39Z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(`${siteConfig.url}/product/${product.slug}`)}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#ddcfbf] bg-white px-4 py-2 font-semibold text-mink transition hover:border-ink hover:text-ink"
          aria-label="Share by Email"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16Zm-16 12V8.99l8 5 8-5V18H4Z" />
          </svg>
          Email
        </a>
      </div>
    </div>
  );
}
