import {
  ArrowLeftRight,
  Calendar1,
  CircleDollarSign,
  HandCoins,
  LucideIcon,
  PlusCircle,
} from "lucide-react";

export function getCategoryIcon(iconString: string | undefined): LucideIcon {
  let icon = PlusCircle;

  if (iconString === "transfer-icon") {
    icon = ArrowLeftRight;
  } else if (iconString === "income-icon") {
    icon = HandCoins;
  } else if (iconString === "budget-icon") {
    icon = CircleDollarSign;
  } else if (iconString === "one-time-icon") {
    icon = Calendar1;
  }

  return icon;
}
