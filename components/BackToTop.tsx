"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group absolute right-6 top-[-3rem] z-[2] flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full bg-charcoal text-center md:right-8"
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        aria-hidden="true"
        className="relative top-0 transition-all duration-200 group-hover:-top-1"
      >
        <circle cx="13.4784" cy="13.2001" r="13.0087" fill="white" />
        <path
          d="M13.4785 17.9297V8.46882M13.4785 8.46882L8.74811 12.9365M13.4785 8.46882L18.209 12.9365"
          stroke="#1C1B1A"
          strokeWidth="0.887"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-1 font-body text-[0.7rem] font-normal uppercase leading-tight tracking-normal text-white">
        Back to top
      </span>
    </button>
  );
}
