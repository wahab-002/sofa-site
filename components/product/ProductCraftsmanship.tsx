import Icon from "@/components/Icon";

export default function ProductCraftsmanship({ productName }: { productName: string }) {
  return (
    <div className="mt-8 space-y-4 font-body">
      <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-charcoal">
          <Icon name="check" className="h-4 w-4 text-forest" />
          Frame &amp; Cushion Construction
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          Every {productName} is built using a reinforced kiln-dried hardwood timber frame, paired with heavy-duty serpentine steel springs for long-lasting resilience. Seating cushions feature high-density reflex foam wrapped in soft Dacron fibre to provide firm, supportive comfort that holds its shape over years of daily family lounging.
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-charcoal">
          <Icon name="shield" className="h-4 w-4 text-forest" />
          Upholstery Care &amp; Fire Safety
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          All fabrics are rigorously tested for everyday durability and comply fully with UK Furniture &amp; Furnishings (Fire Safety) Regulations. To care for your upholstery, simply vacuum regularly with a soft brush attachment and treat minor accidental spills immediately with a damp microfibre cloth. Removable seat and back cushion covers can be unzipped for gentle care.
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-charcoal">
          <Icon name="truck" className="h-4 w-4 text-forest" />
          Doorway Clearance &amp; Room of Choice Delivery
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          Delivered by our dedicated 2-man mainland UK delivery team directly into your ground-floor room of choice. All sofa feet are detachable during transit to reduce overall frame clearance height, enabling easy maneuvering through standard British door frames (75cm+). You pay 100% Cash on Delivery after inspecting the suite.
        </p>
      </div>
    </div>
  );
}
