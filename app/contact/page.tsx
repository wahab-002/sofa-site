export default function ContactPage() {
  return (
    <div className="max-w-md">
      <h1 className="font-display text-3xl text-charcoal mb-4">Get in Touch</h1>
      <p className="font-body text-charcoal/70 mb-6">
        Message us on WhatsApp for delivery times, custom sizes, or to place a cash-on-delivery order.
      </p>
      <a
        href="https://wa.me/447784123321"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-forest text-linen font-body px-6 py-3 rounded-md hover:bg-charcoal transition-colors"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
