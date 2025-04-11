import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  getTwoCapitalLetters,
  nameToColor,
  nameToTextColor,
} from "@/utils/utils";
import { VariantProps } from "class-variance-authority";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { logoVariants } from "./variants";

type Props = {
  name?: string;
  logoUrl?: string;
  loading?: boolean;
  className?: string;
} & VariantProps<typeof logoVariants>;

export const Logo: FC<Props> = ({
  name = "",
  logoUrl,
  size,
  loading,
  className,
}) => {
  if (loading) {
    return <Skeleton className={cn(logoVariants({ size }), "rounded-full")} />;
  }

  return (
    <Avatar className={cn(logoVariants({ size }), className)}>
      <AvatarImage src={logoUrl} />
      <AvatarFallback
        className="font-medium"
        style={{
          backgroundColor: nameToColor(name),
          color: nameToTextColor(name),
        }}
      >
        {getTwoCapitalLetters(name)}
      </AvatarFallback>
    </Avatar>
  );
};
