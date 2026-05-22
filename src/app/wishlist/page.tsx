import { WishlistList } from "@/components/wishlist/WishlistList";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Wishlist", "Review your saved Minskhi pieces.", "/wishlist");

export default function WishlistPage() {
  return (
    <section className="container-shell py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Saved pieces</p>
      <h1 className="mt-3 font-serif text-5xl">Wishlist</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-mink">
        Save favourite gemstones and jewellery while browsing, then add selected pieces to your enquiry list.
      </p>
      <div className="mt-10">
        <WishlistList products={products} />
      </div>
    </section>
  );
}
