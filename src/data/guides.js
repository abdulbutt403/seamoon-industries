export const guides = [
  {
    slug: "private-label-dental-instruments-pakistan",
    title: "How to source private-label dental instruments from Pakistan: a buyer's checklist",
    description:
      "A practical checklist for defining a private-label dental instrument project, qualifying a supplier, reviewing samples and documents, and confirming an export order.",
    excerpt:
      "Plan a private-label project from product scope and drawings through samples, quality evidence, packaging, and shipment terms.",
    faqs: [
      {
        question: "Can a supplier quote from a catalogue number alone?",
        answer: "It can provide an initial estimate, but confirm the exact pattern, specification, finish, packaging, and destination-market requirements before treating the quote as final.",
      },
      {
        question: "Does an ISO 13485 certificate approve my private-label product?",
        answer: "No. It concerns a quality management system within its stated scope; product conformity and market obligations need their own evidence and assessment.",
      },
      {
        question: "What should I send first?",
        answer: "Send a product schedule, drawings or reference samples, target market, packaging brief, and the quantities you want priced. [CONFIRM: Seamoon's inquiry process and required quotation details.]",
      },
    ],
  },
  {
    slug: "420-vs-440-stainless-steel-dental-surgical-instruments",
    title: "420 vs 440 stainless steel: which grade for which dental and surgical instrument",
    description:
      "Understand the practical differences between 420 and 440 stainless steel families, and what buyers should verify before specifying a dental or surgical instrument.",
    excerpt:
      "Compare the broad trade-offs in hardness, edge retention, corrosion behavior, and processing without treating a grade number as a complete specification.",
    faqs: [
      {
        question: "Is 440 always better than 420?",
        answer: "No. Some 440 grades can reach higher hardness, but the appropriate grade depends on function, corrosion needs, processing, and the instrument design.",
      },
      {
        question: "Does “surgical stainless steel” identify a grade?",
        answer: "No. It is not a complete grade specification. Ask for the exact designation and supporting material documentation.",
      },
      {
        question: "Can a buyer select a grade from the product name alone?",
        answer: "No. Confirm the specification and intended use with the product designer, supplier, and relevant regulatory or quality team.",
      },
    ],
  },
  {
    slug: "iso-13485-ce-eu-mdr-supplier-checklist",
    title: "ISO 13485 and CE (EU MDR): what to ask an instrument supplier",
    description:
      "A buyer's guide to checking an instrument supplier's ISO 13485 quality-system evidence and asking the right questions about CE marking under the EU MDR.",
    excerpt:
      "Separate quality-system evidence from product conformity evidence, and prepare focused questions about certificates, scope, device identity, and responsibilities.",
    faqs: [
      {
        question: "Does ISO 13485 certification mean an instrument has CE marking?",
        answer: "No. ISO 13485 concerns a quality management system; CE marking is a separate product conformity matter under applicable legislation.",
      },
      {
        question: "Must every dental or surgical instrument have a notified-body certificate?",
        answer: "Not necessarily. Whether a notified body is involved depends on the device and the applicable conformity assessment route. Confirm this for the specific device.",
      },
      {
        question: "What if a supplier sends only a CE logo or brochure?",
        answer: "Request product-specific conformity documents and confirm the legal manufacturer, device identity, and supporting assessment. Seek regulatory advice if the route or evidence remains unclear.",
      },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));
