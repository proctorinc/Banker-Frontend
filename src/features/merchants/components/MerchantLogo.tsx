import { Logo } from "@/components/logo/Logo";
import { logoVariants } from "@/components/logo/variants";
import { Merchant } from "@/graphql/__generated__/graphql";
import { VariantProps } from "class-variance-authority";
import { FC } from "react";

type Props = {
  merchant?: Merchant;
  className?: string;
} & VariantProps<typeof logoVariants>;

export const MerchantLogo: FC<Props> = ({ merchant, size, className }) => {
  return (
    <Logo
      size={size}
      name={merchant?.name}
      logoUrl={merchant?.logoUrl}
      className={className}
      loading={merchant === undefined}
    />
  );
};
