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

// export function nameToColor(name: string) {
//   let hash = 0;
//   for (let i = 0; i < name.length; i++) {
//     hash = name.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const hue = hash % 360;
//   return `hsl(${hue}, 70%, 60%)`;
// }

export function nameToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = ((hash % 360) + 360) % 360; // Ensuring a positive hue
  const saturation = 60; // Keep saturation in [65, 85] for vibrancy
  const lightness = 70; //55 + (hash % 10); // Keep lightness in [55, 65] for readability

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
