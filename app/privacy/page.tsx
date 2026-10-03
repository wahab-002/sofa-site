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
          heading: "What we collect",
          body: (
            <p>
              When you contact us on WhatsApp or through the site, we may see your name, phone number, delivery address,
              and the sofa configuration you asked about. Analytics tools on the website may collect anonymous usage
              data such as pages visited.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use your details to confirm orders, arrange delivery, answer questions, and improve the site. We do not
              sell your personal information.
            </p>
          ),
        },
        {
          heading: "Sharing",
          body: (
            <p>
              We only share information with delivery partners when needed to fulfil your order, or if the law requires
              it. WhatsApp messages are also subject to Meta&apos;s own privacy terms.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask us what data we hold, request a correction, or ask us to delete it where we no longer need it
              for your order. Message us on WhatsApp or use the contact page.
            </p>
          ),
        },
      ]}
    />
  );
}
