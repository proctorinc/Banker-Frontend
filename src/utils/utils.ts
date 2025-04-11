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

export function nameToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = ((hash % 360) + 360) % 360;
  const saturation = 60;
  const lightness = 70;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function nameToTextColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = ((hash % 360) + 360) % 360;
  const saturation = 60;
  const lightness = 25;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getTwoCapitalLetters(input: string): string {
  const cleaned = input.trim();

  const words = cleaned
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let initials = "";
  if (words.length >= 2) {
    initials = words[0][0] + words[1][0];
  } else if (words.length === 1) {
    initials = words[0].slice(0, 2);
  } else {
    initials = cleaned.slice(0, 2);
  }

  return initials.toUpperCase();
}
