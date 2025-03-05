const ONE_THOUSAND = 1000;
const ONE_MILLION = 1_000_000;

export function formatCurrency(value: number, full = false) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  if (full) {
    return formatted;
  }

  const absoluteVal = Math.abs(value);

  if (absoluteVal > ONE_MILLION) {
    const newValue = (Math.abs(value) / ONE_MILLION).toFixed(1);
    return `${value < 0 ? "-" : ""}$${parseFloat(newValue)}K`;
  } else if (absoluteVal > ONE_THOUSAND) {
    const newValue = (Math.abs(value) / ONE_THOUSAND).toFixed(1);
    return `${value < 0 ? "-" : ""}$${parseFloat(newValue)}K`;
  } else {
    return `${value < 0 ? "-" : ""}$${parseFloat(Math.abs(value).toFixed(1))}`;
  }
}
