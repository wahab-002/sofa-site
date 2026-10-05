/** Accepted card brands — checkout badge strip (Visa / MC / Amex style). */
export default function CardBrandBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}
      aria-label="We accept Visa, Mastercard, American Express, Discover and UnionPay"
    >
      {/* Visa */}
      <span
        title="Visa"
        className="inline-flex h-9 w-[52px] items-center justify-center rounded border border-[#e0e0e0] bg-white px-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        <svg viewBox="0 0 48 16" className="h-4 w-11" aria-hidden>
          <path
            fill="#1A1F71"
            d="M20.5 1.2h-3.4l-2.12 13.1h3.4L20.5 1.2zm13.6 8.5l1.78-4.92.98 4.92h-2.76zM36.3 1.2h-2.62c-.9 0-1.56.4-1.9 1.22l-5.4 11.88h3.56l.76-2.08h4.36l.44 2.08h3.14L36.3 1.2zm-15.8 0l-3.3 8.72-.35-1.76c-.6-1.86-2.48-3.88-4.56-4.88l3.02 11.02h3.58L22.5 1.2h-2zm-8.9 0H8.02L4.6 14.3h3.42c1.86 0 3.24-.9 3.8-2.58l2.78-10.52z"
          />
        </svg>
        <span className="sr-only">Visa</span>
      </span>

      {/* Mastercard */}
      <span
        title="Mastercard"
        className="inline-flex h-9 w-[52px] items-center justify-center rounded border border-[#e0e0e0] bg-white px-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        <svg viewBox="0 0 40 24" className="h-5 w-8" aria-hidden>
          <circle cx="15" cy="12" r="9" fill="#EB001B" />
          <circle cx="25" cy="12" r="9" fill="#F79E1B" />
          <path d="M20 5.4a9 9 0 0 1 0 13.2 9 9 0 0 1 0-13.2z" fill="#FF5F00" />
        </svg>
        <span className="sr-only">Mastercard</span>
      </span>

      {/* American Express */}
      <span
        title="American Express"
        className="inline-flex h-9 w-[52px] items-center justify-center overflow-hidden rounded border border-[#e0e0e0] bg-[#2E77BC] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        <svg viewBox="0 0 48 16" className="h-full w-full" aria-hidden>
          <rect width="48" height="16" fill="#2E77BC" />
          <text
            x="24"
            y="11.2"
            textAnchor="middle"
            fill="#fff"
            fontSize="7.5"
            fontWeight="700"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="0.5"
          >
            AMEX
          </text>
        </svg>
        <span className="sr-only">American Express</span>
      </span>

      {/* Discover */}
      <span
        title="Discover"
        className="inline-flex h-9 w-[52px] items-center justify-center rounded border border-[#e0e0e0] bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        <svg viewBox="0 0 56 16" className="h-3.5 w-12" aria-hidden>
          <text
            x="0"
            y="12"
            fill="#1a1a1a"
            fontSize="9"
            fontWeight="700"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            DISCOVER
          </text>
          <circle cx="52" cy="10" r="3.5" fill="#F47216" />
        </svg>
        <span className="sr-only">Discover</span>
      </span>

      {/* UnionPay */}
      <span
        title="UnionPay"
        className="inline-flex h-9 w-[52px] items-center justify-center rounded border border-[#e0e0e0] bg-white px-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        <svg viewBox="0 0 48 16" className="h-4 w-11" aria-hidden>
          <rect x="2" y="2" width="10" height="12" rx="1" fill="#E21836" opacity="0.9" />
          <rect x="10" y="2" width="10" height="12" rx="1" fill="#00447C" opacity="0.9" />
          <rect x="18" y="2" width="10" height="12" rx="1" fill="#007B5A" opacity="0.9" />
          <text
            x="32"
            y="11.5"
            fill="#1a1a1a"
            fontSize="6"
            fontWeight="700"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            UnionPay
          </text>
        </svg>
        <span className="sr-only">UnionPay</span>
      </span>
    </div>
  );
}
