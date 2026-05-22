"use client";

import { useMemo, useState } from "react";
import { countries, countryFlag, defaultCountry } from "@/lib/countries";

type PhoneCountryFieldsProps = {
  phone: string;
  country: string;
  onPhoneChange: (phone: string) => void;
  onCountryChange: (country: string) => void;
  inputClassName?: string;
  labelClassName?: string;
};

export function PhoneCountryFields({
  phone,
  country,
  onPhoneChange,
  onCountryChange,
  inputClassName = "mt-3 h-[60px] w-full border border-[#d8cfc4] bg-white px-4 text-[15px] text-ink outline-none transition focus:border-[#092E2B]",
  labelClassName = "block text-[13px] uppercase text-mink"
}: PhoneCountryFieldsProps) {
  const initialCountry = useMemo(
    () => countries.find((option) => country.includes(option.name)) ?? defaultCountry,
    [country]
  );
  const [selectedCode, setSelectedCode] = useState(initialCountry.code);
  const [localPhone, setLocalPhone] = useState(phone.replace(/^\+\d+\s*/, ""));

  const selectedCountry =
    countries.find((option) => option.code === selectedCode) ?? defaultCountry;

  function updateCountry(code: string) {
    const next = countries.find((option) => option.code === code) ?? defaultCountry;
    setSelectedCode(next.code);
    onCountryChange(`${countryFlag(next.code)} ${next.name}`);
    onPhoneChange(localPhone ? `${next.dialCode} ${localPhone}` : next.dialCode);
  }

  function updatePhone(value: string) {
    setLocalPhone(value);
    onPhoneChange(value ? `${selectedCountry.dialCode} ${value}` : selectedCountry.dialCode);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className={labelClassName}>
        Phone
        <div className="mt-2 grid grid-cols-[118px_minmax(0,1fr)] sm:grid-cols-[128px_minmax(0,1fr)]">
          <select
            aria-label="Phone country code"
            className={`${inputClassName} mt-0 border-r-0 px-3`}
            onChange={(event) => updateCountry(event.target.value)}
            value={selectedCountry.code}
          >
            {countries.map((option) => (
              <option key={option.code} value={option.code}>
                {countryFlag(option.code)} {option.dialCode}
              </option>
            ))}
          </select>
          <input
            aria-label="Phone number"
            className={`${inputClassName} mt-0`}
            onChange={(event) => updatePhone(event.target.value)}
            type="tel"
            value={localPhone}
          />
        </div>
      </label>

      <label className={labelClassName}>
        Country
        <select
          className={inputClassName}
          onChange={(event) => updateCountry(event.target.value)}
          value={selectedCountry.code}
        >
          {countries.map((option) => (
            <option key={option.code} value={option.code}>
              {countryFlag(option.code)} {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
