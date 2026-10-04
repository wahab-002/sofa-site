// lib/guides.ts - Topical Authority & Buying Guides for UK Sofa Shoppers

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  category: "Buying Advice" | "Living Room Planning" | "Fabric & Care";
  featuredImage: string;
  relatedProducts: { name: string; href: string; reason: string }[];
  faqs: { question: string; answer: string }[];
  sections: {
    heading: string;
    content: string[];
  }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "scatter-back-vs-high-back-sofas",
    title: "Scatter Back vs High Back Sofas: Which Is Right for Your Home?",
    metaTitle: "Scatter Back vs High Back Sofas | UK Buying Guide | The Sofa Hub",
    description:
      "Comparing scatter back cushions and fixed high back sofas for posture, comfort, styling, and everyday UK family living. Find which design suits your lounge best.",
    readingTime: "5 min read",
    publishedAt: "2026-10-05",
    category: "Buying Advice",
    featuredImage: "/shop/design/corner.webp",
    relatedProducts: [
      {
        name: "Verona Sofa (Scatter & High Back)",
        href: "/products/verona-sofa",
        reason: "Available in both high back and scatter back styles across corner, 3+2, and full sets.",
      },
      {
        name: "Dino Jumbo Cord",
        href: "/products/dino-sofa",
        reason: "Our classic deep-seat scatter back sofa with textured cord fabric.",
      },
    ],
    faqs: [
      {
        question: "Is a scatter back sofa good for people with bad backs?",
        answer:
          "Generally, no. Scatter back sofas feature loose fibre-filled cushions that contour to relaxed lounging, but offer less structured lumbar support than a firm, upright high back sofa.",
      },
      {
        question: "Do scatter back cushions need frequent plumping?",
        answer:
          "Yes. Because scatter back cushions are loose, daily or alternate-day plumping is recommended to maintain their full shape and prevent slouching.",
      },
      {
        question: "Can I order both styles with Cash on Delivery at The Sofa Hub?",
        answer:
          "Yes! All Verona and family sofa ranges can be ordered in either high back or scatter back with 100% Cash on Delivery across mainland UK.",
      },
    ],
    sections: [
      {
        heading: "Introduction: The Great Living Room Dilemma",
        content: [
          "When investing in a new living room suite, one of the first design choices you'll encounter is back cushion styling: scatter back versus standard high back (also known as fixed or formal back).",
          "While both styles provide generous seating, they cater to fundamentally different lounging habits, room aesthetics, and maintenance preferences.",
        ],
      },
      {
        heading: "What Is a Scatter Back Sofa?",
        content: [
          "A scatter back sofa uses an assortment of loose, generously stuffed cushions instead of rigid upholstered back panels. This gives the sofa an inviting, sink-in lounge feel that you can rearrange at will.",
          "Pros: Highly customizable comfort; great for curling up with a throw; relaxed, contemporary look.",
          "Cons: Requires regular plumping; can look untidy in minimalist rooms if cushions are not arranged daily.",
        ],
      },
      {
        heading: "What Is a High Back Sofa?",
        content: [
          "A high back sofa features tailored, fixed or semi-fixed cushions designed to support the entire spine, neck, and shoulders. The profile remains pristine and symmetrical at all times.",
          "Pros: Superior posture and lumbar support; easy to sit down and stand up from; maintains a neat, showroom appearance effortlessly.",
          "Cons: Less adaptable for unconventional lounging postures or lying across cushions.",
        ],
      },
      {
        heading: "Verdict: Which Should You Choose?",
        content: [
          "Choose Scatter Back if your living room is a cosy media hub where you love curling your legs up and sinking into deep cushions.",
          "Choose High Back if you prefer sitting upright for reading, entertaining, or if anyone in your household requires dependable lower-back support.",
          "Explore the Verona Sofa on The Sofa Hub, where you can toggle between both scatter back and high back configurations before ordering.",
        ],
      },
    ],
  },
  {
    slug: "corner-sofa-vs-3-and-2-seater-set",
    title: "Corner Sofa vs 3+2 Seater Set: Which Fits Your Living Room Better?",
    metaTitle: "Corner Sofa vs 3+2 Set | Space Planning Guide | The Sofa Hub",
    description:
      "Deciding between a spacious L-shape corner sofa and a versatile 3+2 seater suite. Floor space planning, walk-around flow, and seating capacity compared.",
    readingTime: "6 min read",
    category: "Living Room Planning",
    publishedAt: "2026-10-05",
    featuredImage: "/shop/design/3-2-set.webp",
    relatedProducts: [
      {
        name: "Atalian Chesterfield",
        href: "/products/atalian-sofa",
        reason: "Available as matching 3+2 sets or luxury corner suites in velvet and chenille.",
      },
      {
        name: "Lily Sofa",
        href: "/products/lily-sofa",
        reason: "Versatile modular and corner layouts for compact and large living rooms alike.",
      },
    ],
    faqs: [
      {
        question: "Does a corner sofa make a small living room look bigger or smaller?",
        answer:
          "In many compact British living rooms, a corner sofa actually makes the room feel larger because it tucks neatly into unused wall angles, opening up central floor space compared to two separate couches.",
      },
      {
        question: "Can a 3+2 seater set be split across different rooms?",
        answer:
          "Yes. One of the main advantages of a 3+2 set is versatility: you can place the 3-seater in the main lounge and the 2-seater in a conservatory or snug if needed.",
      },
    ],
    sections: [
      {
        heading: "Maximizing Living Space: Corners vs Pairs",
        content: [
          "Choosing between an L-shaped corner sofa and a classic 3-piece or 2-piece set is the most common space-planning decision for UK homeowners.",
          "Both options offer generous seating for families, but each has unique strengths depending on your room's traffic paths, radiator placement, and window lines.",
        ],
      },
      {
        heading: "When a Corner Sofa Wins",
        content: [
          "1. Corner sofas anchor open-plan living rooms without creating visual clutter.",
          "2. They allow family members to put their feet up together along the chaise section.",
          "3. They eliminate the 'dead corner' behind two separate sofas, maximizing every square foot of your floorplan.",
        ],
      },
      {
        heading: "When a 3+2 Set Wins",
        content: [
          "1. Living rooms with multiple doorways, bay windows, or central fireplaces usually require separated seating to maintain clear walkways.",
          "2. A 3+2 set gives guests their own personal space rather than sitting in close corner contact.",
          "3. Flexibility: when moving home, two separate sofas are significantly easier to adapt to new floor plans.",
        ],
      },
    ],
  },
  {
    slug: "how-to-measure-for-sofa-delivery-uk",
    title: "How to Measure Your Doorways & Living Room for Sofa Delivery",
    metaTitle: "How to Measure for Sofa Delivery UK | Dimension Checklist | The Sofa Hub",
    description:
      "Avoid delivery day heartbreak! Step-by-step checklist to measure front doors, hallways, stairwells, and living room corners before ordering your new sofa.",
    readingTime: "4 min read",
    category: "Living Room Planning",
    publishedAt: "2026-10-05",
    featuredImage: "/shop/design/modular.webp",
    relatedProducts: [
      {
        name: "Bishop U-Shape Sofa",
        href: "/products/bishop-u-shape",
        reason: "Delivered in modular sections designed to pass through standard UK door frames.",
      },
    ],
    faqs: [
      {
        question: "What is the minimum door width needed for sofa delivery in the UK?",
        answer:
          "Most UK interior doors are between 75cm and 82cm wide. If your sofa's packaged depth or height is under 75cm, it will pass through easily. Most large sofas feature removable feet to reduce clearance height.",
      },
      {
        question: "What if the sofa does not fit on delivery day?",
        answer:
          "Because The Sofa Hub operates on 100% Cash on Delivery, you never risk money upfront. If access is impossible, our 2-man team can advise on modular alternatives.",
      },
    ],
    sections: [
      {
        heading: "The Golden Rule: Measure the Delivery Path, Not Just the Lounge",
        content: [
          "The number one reason for failed furniture deliveries across the UK is not that the sofa doesn't fit in the living room — it's that it cannot navigate the front porch, tight stairwell, or hallway turn.",
          "Follow this simple 4-step checklist before confirming your order on WhatsApp.",
        ],
      },
      {
        heading: "Step 1: Check Doorway Clearances",
        content: [
          "Measure the height and width of your external front door and all interior doorways the delivery team must pass.",
          "Remember: door handles, letterboxes, and inner storm doors can reduce clearance width by 5–10cm.",
        ],
      },
      {
        heading: "Step 2: Check Hallways and Stair Turns",
        content: [
          "If your entry features a 90-degree turn immediately behind the door, check the diagonal clearance. Long 3-seater sofas require pivot space to rotate through the entrance.",
          "For first-floor apartments or townhouses, measure stairwell ceiling height and banister clearance.",
        ],
      },
      {
        heading: "Step 3: Removable Sofa Feet",
        content: [
          "All sofas at The Sofa Hub come with detachable feet, which lowers the overall height by 8cm to 12cm during transit. This allows even deep luxury frames to slide through standard UK doorways safely.",
        ],
      },
    ],
  },
];

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
