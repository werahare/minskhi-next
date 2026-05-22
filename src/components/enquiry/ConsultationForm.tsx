"use client";

import { useState } from "react";
import { buildMailto } from "@/lib/enquiry";
import { countryFlag, defaultCountry } from "@/lib/countries";
import { PhoneCountryFields } from "@/components/ui/PhoneCountryFields";

export function ConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(defaultCountry.dialCode);
  const [country, setCountry] = useState(`${countryFlag(defaultCountry.code)} ${defaultCountry.name}`);
  const [method, setMethod] = useState("Private Video Consultation (Zoom / Google Meet)");
  const [remark, setRemark] = useState("");

  const body = [
    "Hello Minskhi,",
    "",
    "I would like to request a consultation.",
    "",
    `Preferred method: ${method}`,
    "",
    "Remark:",
    remark,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Country: ${country}`
  ].join("\n");

  const inputClass =
    "mt-3 h-[60px] w-full border border-[#d8cfc4] bg-white px-4 text-[15px] text-ink outline-none transition focus:border-[#092E2B]";
  const labelClass = "block text-[13px] uppercase tracking-[0.26em] text-mink";

  return (
    <form className="mx-auto max-w-[833px] space-y-7">
      <label className={labelClass}>
        Name
        <input
          className={inputClass}
          onChange={(event) => setName(event.target.value)}
          type="text"
          value={name}
        />
      </label>

      <label className={labelClass}>
        Email
        <input
          className={inputClass}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
      </label>

      <PhoneCountryFields
        phone={phone}
        country={country}
        onPhoneChange={setPhone}
        onCountryChange={setCountry}
        inputClassName={inputClass}
        labelClassName={labelClass}
      />

      <label className={labelClass}>
        Consultation Method
        <select
          className={inputClass}
          id="method"
          onChange={(event) => setMethod(event.target.value)}
          value={method}
        >
          <option>Private Video Consultation (Zoom / Google Meet)</option>
          <option>Phone Consultation</option>
          <option>Email Consultation</option>
        </select>
      </label>

      <label className={labelClass}>
        Remark
        <textarea
          className="mt-3 min-h-[210px] w-full border border-[#d8cfc4] bg-white px-4 py-4 text-[15px] text-ink outline-none transition focus:border-[#092E2B]"
          onChange={(event) => setRemark(event.target.value)}
          value={remark}
        />
      </label>

      <a
        className="inline-flex h-12 items-center justify-center bg-[#092E2B] px-8 text-[11px] uppercase tracking-[0.18em] text-white transition hover:bg-ink"
        href={buildMailto("Minskhi consultation request", body)}
      >
        Submit Request
      </a>
    </form>
  );
}
