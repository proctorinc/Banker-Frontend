import { Account } from "@/graphql/__generated__/graphql";
import { FC } from "react";
import { LogoLink } from "@/components/logo/LogoLink";

type Props = {
  account?: Account;
  loading?: boolean;
};

export const AccountLink: FC<Props> = ({ account }) => {
  return (
    <LogoLink
      link={account ? `/account/${account.id}` : ""}
      name={account?.name}
      logoUrl={account?.logoUrl as string | undefined}
      loading={account === undefined}
    />
  );
};
