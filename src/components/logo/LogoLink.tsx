import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Skeleton } from "../ui/skeleton";

type Props = {
  name?: string;
  logoUrl?: string;
  link: string;
  loading?: boolean;
};

export const LogoLink: FC<Props> = ({ name, logoUrl, link, loading }) => {
  return (
    <Link
      to={link}
      className="flex gap-0.5 items-center line-clamp-1 max-w-[250px] w-full"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start gap-2 text-left"
          >
            <Logo name={name} logoUrl={logoUrl} loading={loading} />
            {loading && <Skeleton className="w-[100px] h-[20px] rounded-xl" />}
            {!loading && (
              <span className=" line-clamp-1 text-ellipsis w-full">{name}</span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{name}</TooltipContent>
      </Tooltip>
    </Link>
  );
};
