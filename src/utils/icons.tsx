import {
  ArrowLeftRight,
  BanknoteArrowUp,
  // BanknoteArrowUp,
  Calendar1,
  CircleDollarSign,
  HandCoins,
  LucideIcon,
  Plus,
  Receipt,
} from "lucide-react";

export function getCategoryIcon(iconString: string | undefined): LucideIcon {
  let icon = Plus;

  if (iconString === "transfer-icon") {
    icon = ArrowLeftRight;
  } else if (iconString === "income-icon") {
    icon = HandCoins;
  } else if (iconString === "budget-icon") {
    icon = CircleDollarSign;
  } else if (iconString === "one-time-icon") {
    icon = Calendar1;
  } else if (iconString === "refund-icon") {
    icon = BanknoteArrowUp;
  } else if (iconString === "bills-icon") {
    icon = Receipt;
  }

  return icon;
}
