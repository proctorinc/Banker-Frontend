import { Merchant } from "@/graphql/__generated__/graphql";
import { FC } from "react";
import { LogoLink } from "@/components/logo/LogoLink";

type Props = {
  merchant?: Merchant;
  loading?: boolean;
};

export const MerchantLink: FC<Props> = ({ merchant }) => {
  return (
    <LogoLink
      link={`/merchant/${merchant?.id}`}
      name={merchant?.name}
      logoUrl={merchant?.logoUrl}
      loading={merchant === undefined}
    />
  );
};
