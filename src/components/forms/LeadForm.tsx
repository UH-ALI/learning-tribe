"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GRADES, SUBJECTS, leadSchema, type LeadInput } from "@/lib/leadSchema";
import { whatsappLink } from "@/content/site";

type Status = "idle" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", whatsapp: "", grade: "", subjects: [] },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold text-navy">
          Thanks, {getValues("name").trim().split(" ")[0]}!
        </h3>
        <p className="mt-2 text-slate-600">
          We&apos;ve got your details and will WhatsApp you within a few hours
          to schedule your free trial class.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-6"
        >
          Or message us right now
        </a>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-xl sm:p-8"
    >
      {/* Honeypot — hidden from real users, filled by naive bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-name"
            className="mb-1.5 block text-sm font-bold text-navy"
          >
            Student&apos;s name
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Ayesha Khan"
            className={inputClasses}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lead-whatsapp"
            className="mb-1.5 block text-sm font-bold text-navy"
          >
            WhatsApp number
          </label>
          <input
            id="lead-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="03XX XXXXXXX"
            className={inputClasses}
            aria-invalid={!!errors.whatsapp}
            {...register("whatsapp")}
          />
          {errors.whatsapp && (
            <p role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.whatsapp.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="lead-grade"
          className="mb-1.5 block text-sm font-bold text-navy"
        >
          Grade / level
        </label>
        <select
          id="lead-grade"
          className={inputClasses}
          aria-invalid={!!errors.grade}
          {...register("grade")}
        >
          <option value="" disabled>
            Select your grade…
          </option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p role="alert" className="mt-1.5 text-sm text-red-600">
            {errors.grade.message}
          </p>
        )}
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold text-navy">
          Subjects you&apos;re interested in
        </legend>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <label
              key={subject}
              className="cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-navy transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold has-[:checked]:text-navy-dark"
            >
              <input
                type="checkbox"
                value={subject}
                className="sr-only"
                {...register("subjects")}
              />
              {subject}
            </label>
          ))}
        </div>
        {errors.subjects && (
          <p role="alert" className="mt-1.5 text-sm text-red-600">
            {errors.subjects.message}
          </p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Book My Free Trial"}
      </button>

      {status === "error" && (
        <div role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-center">
          <p className="text-sm font-semibold text-red-700">
            Something went wrong on our end — but you can still reach us
            instantly:
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-display font-bold text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            Message us on WhatsApp instead
          </a>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        No spam, no fees to inquire — we only use your number to schedule your
        trial class.
      </p>
    </form>
  );
}
