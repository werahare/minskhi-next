import { CartList } from "@/components/cart/CartList";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Shopping Cart", "Review your Minskhi shopping cart.", "/cart");

export default function CartPage() {
  return (
    <section className="container-shell py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Your selection</p>
      <h1 className="mt-3 font-serif text-5xl">Shopping Cart</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-mink">
        Review your selection and continue to secure payment when Stripe is configured. Each product is limited to one per customer.
      </p>
      <div className="mt-10">
        <CartList products={products} />
      </div>
    </section>
  );
}
