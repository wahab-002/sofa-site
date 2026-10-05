import PolicyLayout, { policyMetadata } from "@/components/PolicyLayout";

export const metadata = policyMetadata(
  "Privacy Policy",
  "How The Sofa Hub collects and uses your personal information when you browse or order via WhatsApp.",
);

export default function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy policy"
      intro="We keep things simple. We only collect what we need to answer your messages and deliver your order."
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                The Sofa Hub operates on an enquiry-to-delivery model primarily conducted through WhatsApp and our website. We only collect the minimal personal data necessary to quote, confirm, schedule, and complete the delivery of your sofa.
              </p>
              <p className="mt-3">
                This includes: your name, telephone/mobile number, delivery address (including postcode), order specifications (sofa model, layout, colour, and optional extras), and delivery access notes. When browsing our website, anonymous technical logs (such as browser type, referring URLs, and page visit duration) may be collected for performance monitoring.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Personal Data",
          body: (
            <>
              <p>
                We use your information exclusively to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Respond to product enquiries and provide accurate sizing recommendations.</li>
                <li>Process your sofa order and assign your booking to our logistics fleet.</li>
                <li>Communicate delivery tracking updates and driver ETA calls on your delivery date.</li>
                <li>Provide post-delivery customer care and honour our 12-month structural guarantee.</li>
              </ul>
              <p className="mt-3">
                We never sell, rent, or trade your personal information to third-party marketing brokers under any circumstances.
              </p>
            </>
          ),
        },
        {
          heading: "Third-Party Service Providers & Delivery Partners",
          body: (
            <>
              <p>
                Your contact details and delivery address are shared strictly with our verified delivery teams to facilitate physical room-of-choice placement. Conversations conducted over WhatsApp are encrypted in transit and subject to Meta&apos;s privacy infrastructure.
              </p>
            </>
          ),
        },
        {
          heading: "Your UK GDPR Rights & Contact",
          body: (
            <>
              <p>
                Under UK Data Protection legislation and the UK GDPR, you maintain full rights to access the personal data we hold about you, request corrections to inaccurate records, or request complete erasure of your data following delivery completion.
              </p>
              <p className="mt-3">
                To submit a data access or deletion request, simply send a message to our customer service desk on WhatsApp or email our support team directly.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
