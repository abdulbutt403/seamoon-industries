export const formatInquiryProducts = (items) =>
  items
    .map(
      (item, index) =>
        `${index + 1}. ${item.code} — ${item.name} — Quantity: ${item.quantity}`
    )
    .join("\n");

