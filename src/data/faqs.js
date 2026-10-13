// The displayed FAQ copy and JSON-LD share these exact question/answer strings.
export const oemFaqs = [
  {
    question: "What is the minimum order quantity (MOQ) for OEM instruments?",
    answer: "MOQ varies by instrument type. For standard catalogue items the minimum is typically 100 pieces per reference. For fully custom designs — new geometry, bespoke handle profiles, or proprietary alloys — we discuss MOQ during the design phase, usually starting at 200–500 pieces depending on tooling requirements.",
  },
  {
    question: "How long does an OEM or private-label order take?",
    answer: "Standard catalogue items with custom branding or packaging ship within 4–6 weeks of order confirmation. New instrument designs requiring tooling or prototyping typically take 8–14 weeks from approved drawings to first production batch. We provide a detailed production schedule at the time of order.",
  },
  {
    question: "Can you match an existing instrument design or competitor reference?",
    answer: "Yes. Send us a sample, technical drawing, or reference number and our engineering team will produce a dimensional report and material specification for your approval before production begins.",
  },
  {
    question: "What customisation options are available?",
    answer: "We support custom handle geometry, surface finish (satin, mirror, black oxide, titanium-nitride coating), laser-engraved or electro-etched branding, custom packaging (pouches, trays, sets), and private-label documentation including CE declarations and IFU inserts.",
  },
  {
    question: "Which certifications cover OEM production?",
    answer: "All OEM production runs under our ISO 13485 quality-management system and ISO 9001:2015 framework. CE-marked instruments are produced to EU MDR requirements. US FDA-registered instruments are available for the North American market. Full traceability records are maintained per batch.",
  },
  {
    question: "Do you offer surgical set assembly and custom packaging?",
    answer: "Yes. We assemble procedure-specific sets, sterilisation trays, and custom kit configurations. Packaging options include individual peel pouches, rigid trays, and branded retail-style boxes with printed inserts.",
  },
];

export const certificationFaqs = [
  {
    question: "Are your instruments CE marked for the European market?",
    answer: "Yes. Applicable instrument categories carry CE marking under EU MDR 2017/745. We can supply declarations of conformity, technical file summaries, and IFU documentation to support your own regulatory requirements.",
  },
  {
    question: "Are you FDA registered for exports to the United States?",
    answer: "Yes. Seamoon Industries holds US FDA establishment registration and device listings for our surgical and dental instrument categories, enabling direct export to US distributors and healthcare procurement programmes.",
  },
  {
    question: "What quality-management standard covers your production?",
    answer: "Our primary quality-management standard is ISO 13485:2016, which is specific to medical device manufacturing. This is supported by ISO 9001:2015 for general process quality. Both are audited by accredited third-party certification bodies.",
  },
  {
    question: "Can you provide batch traceability records?",
    answer: "Yes. Under our ISO 13485 system, full batch traceability is maintained from raw material lot through to finished goods and shipping. Records are available on request for quality audits or regulatory submissions.",
  },
];

export const toFaqPageSchema = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
