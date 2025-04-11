import { cva } from "class-variance-authority";

export const logoVariants = cva("bg-white rounded-full", {
  variants: {
    size: {
      default: "w-[30px] h-[30px] text-xs",
      lg: "w-12 h-12 text-xl",
      sm: "w-[25px] h-[25px] text-xs",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
