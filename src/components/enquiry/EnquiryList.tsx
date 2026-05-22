"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildEnquiryMessage, buildMailto, readEnquiryItems, writeEnquiryItems, type EnquiryDetails } from "@/lib/enquiry";
import { productImage } from "@/lib/images";
import type { EnquiryItem, Product } from "@/lib/types";
import { siteConfig } from "@/config/site";
import { EmptyState } from "@/components/ui/EmptyState";
import { PhoneCountryFields } from "@/components/ui/PhoneCountryFields";
import { countryFlag, defaultCountry } from "@/lib/countries";

export function EnquiryList({ products }: { products: Product[] }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState<EnquiryDetails>({
    name: "",
    email: "",
    phone: defaultCountry.dialCode,
    country: `${countryFlag(defaultCountry.code)} ${defaultCountry.name}`,
    remark: ""
  });

  useEffect(() => {
    setItems(readEnquiryItems());
  }, []);

  function handleClose() {
    setShowForm(false);
    setSubmitted(false);
  }

  function handleEmailSubmit() {
    setSubmitted(true);
  }

  const selected = useMemo(
    () =>
      items
        .map((item) => ({
          item,
          product: products.find((product) => product.slug === item.slug)
        }))
        .filter((entry): entry is { item: EnquiryItem; product: Product } => Boolean(entry.product)),
    [items, products]
  );

  function persist(next: EnquiryItem[]) {
    setItems(next);
    writeEnquiryItems(next);
  }

  function removeItem(slug: string) {
    persist(items.filter((entry) => entry.slug !== slug));
  }

  function updateQuantity(slug: string, quantity: number) {
    persist(
      items.map((entry) =>
        entry.slug === slug ? { ...entry, quantity: Math.max(1, quantity) } : entry
      )
    );
  }

  function clearList() {
    persist([]);
    setShowClearConfirm(false);
  }

  if (!selected.length) {
    return (
      <EmptyState
        title="Your enquiry list is empty"
        message="Add gemstones or jewellery from the collection and return here to send Minskhi a structured enquiry."
        actionHref="/collection"
        actionLabel="Browse Collection"
      />
    );
  }

  const body = buildEnquiryMessage(selected.map((entry) => entry.product));
  const modalBody = buildEnquiryMessage(selected.map((entry) => entry.product), enquiryDetails);

  return (
    <>
      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10 backdrop-blur-md">
          <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-[1200px] flex-col overflow-hidden rounded-[14px] border border-[#ddcfbf] bg-white shadow-2xl">
            <div className="shrink-0 flex flex-col gap-4 border-b border-[#ddcfbf] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl">Enquiry form</h2>
                <p className="mt-2 text-sm leading-7 text-mink">
                  Provide your details and review selected products before sending to Minskhi.
                </p>
              </div>
              <button
                className="rounded-full border border-[#d5c6b6] px-4 py-2 text-sm uppercase tracking-[0.18em] text-mink"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
            </div>
            {submitted ? (
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-6 py-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="rounded-[10px] border border-[#ddcfbf] bg-porcelain p-6 text-sm leading-7 text-mink">
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#d9e9df] bg-[#e6f6ed] px-4 py-3 text-[#0b683f]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm font-semibold uppercase tracking-[0.23em]">Success</span>
                    </div>
                    <h3 className="mt-6 font-serif text-3xl">Thank you</h3>
                    <p className="mt-4 text-base text-[#33413d]">
                      Your enquiry has been submitted successfully. We will follow up with you shortly.
                    </p>
                    <div className="mt-6 grid gap-3 rounded-[10px] border border-[#d9e9df] bg-white p-5 text-sm text-mink sm:grid-cols-2">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7f8b82]">Name</p>
                        <p className="mt-2 font-medium text-[#0f311f]">{enquiryDetails.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7f8b82]">Email</p>
                        <p className="mt-2 font-medium text-[#0f311f]">{enquiryDetails.email || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7f8b82]">Phone</p>
                        <p className="mt-2 font-medium text-[#0f311f]">{enquiryDetails.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7f8b82]">Country</p>
                        <p className="mt-2 font-medium text-[#0f311f]">{enquiryDetails.country || "—"}</p>
                      </div>
                    </div>
                    {enquiryDetails.remark ? (
                      <div className="mt-4 rounded-[10px] border border-[#d9e9df] bg-white p-4 text-sm text-mink">
                        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7f8b82]">Remark</p>
                        <p className="mt-2 font-medium text-[#0f311f]">{enquiryDetails.remark}</p>
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="rounded-[10px] border border-[#ddcfbf] bg-white p-4 sm:p-5">
                    <h3 className="font-serif text-xl">Products in your enquiry</h3>
                    <div className="mt-4 max-h-[48vh] overflow-auto pr-0 sm:pr-2">
                      <ul className="space-y-3 text-sm leading-6 text-mink">
                        {selected.map(({ item, product }, index) => (
                          <li key={product.slug} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 rounded-[10px] border border-[#d5c6b6] bg-white p-2.5 sm:flex sm:items-center sm:p-3">
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-linen sm:h-16 sm:w-16">
                              <Image src={productImage(product.mainImage)} alt={product.name} fill sizes="64px" className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-semibold leading-snug sm:text-sm">{index + 1}. {product.name}</p>
                              <p className="mt-1 text-[11px] leading-tight text-mink sm:text-xs">SKU: {product.sku || "N/A"}</p>
                            </div>
                            <div className="col-span-2 text-sm text-mink sm:col-span-1">Qty: {item.quantity}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-6 py-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <label className="block text-xs uppercase tracking-[0.18em] text-mink">
                    Name
                    <input
                      className="mt-2 h-12 w-full border border-[#d9cbbb] bg-transparent px-3"
                      value={enquiryDetails.name}
                      onChange={(event) => setEnquiryDetails({ ...enquiryDetails, name: event.target.value })}
                    />
                  </label>
                  <label className="block text-xs uppercase tracking-[0.18em] text-mink">
                    Email
                    <input
                      className="mt-2 h-12 w-full border border-[#d9cbbb] bg-transparent px-3"
                      type="email"
                      value={enquiryDetails.email}
                      onChange={(event) => setEnquiryDetails({ ...enquiryDetails, email: event.target.value })}
                    />
                  </label>
                  <PhoneCountryFields
                    phone={enquiryDetails.phone ?? defaultCountry.dialCode}
                    country={enquiryDetails.country ?? `${countryFlag(defaultCountry.code)} ${defaultCountry.name}`}
                    onPhoneChange={(phone) => setEnquiryDetails({ ...enquiryDetails, phone })}
                    onCountryChange={(country) => setEnquiryDetails({ ...enquiryDetails, country })}
                    inputClassName="mt-2 h-12 w-full border border-[#d9cbbb] bg-transparent px-3 text-ink outline-none transition focus:border-[#092E2B]"
                    labelClassName="block text-xs uppercase tracking-[0.18em] text-mink"
                  />
                  <label className="block text-xs uppercase tracking-[0.18em] text-mink">
                    Remark
                    <textarea
                      className="mt-2 min-h-[220px] w-full border border-[#d9cbbb] bg-transparent px-3 py-3"
                      value={enquiryDetails.remark}
                      onChange={(event) => setEnquiryDetails({ ...enquiryDetails, remark: event.target.value })}
                    />
                  </label>
                  <div className="rounded-[10px] border border-[#ddcfbf] bg-porcelain p-5">
                    <h3 className="font-serif text-xl">Enquiry actions</h3>
                    <p className="mt-3 text-sm leading-7 text-mink">
                      Confirm the details then send your enquiry via email.
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        className="inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
                        onClick={handleEmailSubmit}
                        type="button"
                      >
                        Send enquiry by email
                      </button>
                      <button
                        className="inline-flex w-full justify-center rounded-full border border-ink bg-white px-6 py-3 text-xs uppercase tracking-[0.18em] text-mink"
                        onClick={handleClose}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex-1 overflow-auto">
                    <div className="rounded-[10px] border border-[#ddcfbf] bg-white p-4 sm:p-5">
                      <h3 className="font-serif text-xl">Products in your enquiry</h3>
                      <div className="mt-4 pr-0 sm:pr-2">
                        <ul className="space-y-3 text-sm leading-6 text-mink">
                          {selected.map(({ item, product }, index) => (
                            <li key={product.slug} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 rounded-[10px] border border-[#d5c6b6] bg-white p-2.5 sm:flex sm:items-center sm:p-3">
                              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-linen sm:h-16 sm:w-16">
                                <Image src={productImage(product.mainImage)} alt={product.name} fill sizes="64px" className="object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[12px] font-semibold leading-snug sm:text-sm">{index + 1}. {product.name}</p>
                                <p className="mt-1 text-[11px] leading-tight text-mink sm:text-xs">SKU: {product.sku || "N/A"}</p>
                              </div>
                              <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-1 sm:flex-col sm:items-end">
                                <div className="inline-flex items-center overflow-hidden rounded-full border border-[#d5c6b6] bg-white">
                                  <button
                                    aria-label={`Decrease quantity for ${product.name}`}
                                    className="flex h-7 w-7 items-center justify-center text-mink transition hover:bg-[#092E2B] hover:text-white sm:h-8 sm:w-8"
                                    onClick={() => updateQuantity(product.slug, item.quantity - 1)}
                                    type="button"
                                  >
                                    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                  </button>
                                  <input
                                    aria-label={`Quantity for ${product.name}`}
                                    className="h-7 w-8 border-x border-[#d5c6b6] bg-transparent text-center text-xs outline-none sm:h-8 sm:w-10 sm:text-sm"
                                    min={1}
                                    onChange={(event) => updateQuantity(product.slug, Number(event.target.value) || 1)}
                                    type="number"
                                    value={item.quantity}
                                  />
                                  <button
                                    aria-label={`Increase quantity for ${product.name}`}
                                    className="flex h-7 w-7 items-center justify-center text-mink transition hover:bg-[#092E2B] hover:text-white sm:h-8 sm:w-8"
                                    onClick={() => updateQuantity(product.slug, item.quantity + 1)}
                                    type="button"
                                  >
                                    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                  </button>
                                </div>
                                <button
                                  aria-label={`Remove ${product.name}`}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-[#d5c6b6] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.1em] text-mink transition hover:border-[#092E2B] hover:bg-[#092E2B] hover:text-white sm:gap-2 sm:px-3 sm:text-[10px]"
                                  onClick={() => removeItem(product.slug)}
                                  type="button"
                                >
                                  <svg aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7l1 13h6l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span>Remove</span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {showClearConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md">
          <div className="w-full max-w-[560px] overflow-hidden rounded-[14px] border border-[#ddcfbf] bg-white shadow-2xl">
            <div className="border-b border-[#ddcfbf] px-7 py-6">
              <p className="text-xs uppercase tracking-[0.24em] text-mink">Confirmation</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">Clear enquiry list?</h2>
            </div>
            <div className="bg-[#fbfaf8] px-7 py-6">
              <div className="border border-[#d9cbbb] bg-white px-5 py-5">
                <p className="text-sm leading-7 text-mink">
                  Are you sure you want to remove all selected products from your enquiry list?
                </p>
              </div>
            </div>
            <div className="grid gap-3 border-t border-[#ddcfbf] bg-white px-7 py-6 sm:grid-cols-2">
              <button
                className="inline-flex h-12 items-center justify-center bg-ink px-5 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#092E2B]"
                onClick={clearList}
                type="button"
              >
                Yes, clear
              </button>
              <button
                className="inline-flex h-12 items-center justify-center border border-ink bg-white px-5 text-xs uppercase tracking-[0.18em] text-mink transition hover:border-[#092E2B] hover:bg-[#092E2B] hover:text-white"
                onClick={() => setShowClearConfirm(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        {selected.map(({ item, product }) => (
          <div className="grid gap-4 border border-[#ddcfbf] bg-porcelain p-4 sm:grid-cols-[120px_1fr_auto]" key={product.slug}>
            <Link className="relative aspect-square overflow-hidden bg-linen" href={`/product/${product.slug}`}>
              <Image src={productImage(product.mainImage)} alt={product.name} fill sizes="140px" className="object-cover" />
            </Link>
            <div>
              <h2 className="font-serif text-2xl">
                <Link href={`/product/${product.slug}`}>{product.name}</Link>
              </h2>
              <p className="mt-2 text-sm text-mink">SKU: {product.sku || "N/A"}</p>
              <label className="mt-4 inline-flex items-center gap-3 text-sm text-mink">
                Quantity
                <input
                  className="h-10 w-20 border border-[#d5c6b6] bg-transparent px-2 text-center"
                  min={1}
                  onChange={(event) =>
                    persist(
                      items.map((entry) =>
                        entry.slug === item.slug
                          ? { ...entry, quantity: Number(event.target.value) || 1 }
                          : entry
                      )
                    )
                  }
                  type="number"
                  value={item.quantity}
                />
              </label>
            </div>
            <button
              className="self-start text-xs uppercase tracking-[0.18em] text-mink"
              onClick={() => persist(items.filter((entry) => entry.slug !== item.slug))}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <aside className="h-fit border border-[#ddcfbf] bg-porcelain p-6">
        <h2 className="font-serif text-2xl">Send enquiry</h2>
        <p className="mt-3 text-sm leading-7 text-mink">
          Open the enquiry form to add your contact details and submit a personalised request.
        </p>
        <button
          className="mt-6 flex w-full justify-center border border-ink bg-ink px-5 py-3 text-center text-xs uppercase tracking-[0.18em] text-white"
          onClick={() => setShowForm(true)}
          type="button"
        >
          Open enquiry form
        </button>
        <a
          className="mt-3 flex justify-center border border-ink px-5 py-3 text-center text-xs uppercase tracking-[0.18em]"
          href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(body)}`}
        >
          WhatsApp enquiry
        </a>
        <button
          className="mt-3 w-full px-5 py-3 text-xs uppercase tracking-[0.18em] text-mink"
          onClick={() => setShowClearConfirm(true)}
          type="button"
        >
          Clear list
        </button>
      </aside>
    </div>
  </>
  );
}
