import { Logo } from "@/components/logo/Logo";
import { logoVariants } from "@/components/logo/variants";
import { Account } from "@/graphql/__generated__/graphql";
import { VariantProps } from "class-variance-authority";
import { FC } from "react";

type Props = {
  account?: Account;
  className?: string;
} & VariantProps<typeof logoVariants>;

export const AccountLogo: FC<Props> = ({ account, size, className }) => {
  return (
    <Logo
      size={size}
      name={account?.name}
      logoUrl={account?.logoUrl as string | undefined}
      className={className}
      loading={account === undefined}
    />
  );
};
