import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Merchant } from "@/graphql/__generated__/graphql";
import { nameToColor } from "@/utils/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  merchant: Merchant;
  loading?: boolean;
};

export const MerchantLink: FC<Props> = ({ merchant }) => {
  return (
    <Link
      to={`/merchant/${merchant.id}`}
      className="flex gap-0.5 items-center line-clamp-1 w-fit"
    >
      <Avatar className="w-8 h-8 bg-white rounded-full">
        <AvatarImage
          src={`https://www.${merchant.name.replace(" ", "")}.com/favicon.ico`}
        />
        <AvatarFallback
          className="text-xs font-medium"
          style={{ backgroundColor: nameToColor(merchant.name) }}
        >
          {merchant.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Tooltip>
        <TooltipTrigger
          asChild
          className="text-left w-fit whitespace-nowrap overflow-clip overflow-ellipsis"
        >
          <Button className="h-6 px-2 font-normal" variant="ghost">
            {merchant.name}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">View merchant</TooltipContent>
      </Tooltip>
    </Link>
  );
};
