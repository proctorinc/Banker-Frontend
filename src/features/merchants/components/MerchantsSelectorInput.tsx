import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Merchant } from "@/graphql/__generated__/graphql";
import { ChevronsUpDown } from "lucide-react";
import { ComponentProps, useState, forwardRef } from "react";

type Props = {
  merchants: Merchant[];
} & Omit<ComponentProps<"input">, "type">;

export const MerchantsSelectorInput = forwardRef<HTMLInputElement, Props>(
  ({ merchants, value, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative w-full">
          <Input
            role="combobox"
            aria-expanded={open}
            className="w-[200px]"
            value={value}
            ref={ref}
            {...props}
          />
          <PopoverTrigger asChild>
            <Button
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 h-4 w-4 opacity-50"
              variant="ghost"
            >
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No month found.</CommandEmpty>
              <CommandGroup>
                {merchants.map((merchant) => (
                  <CommandItem
                    key={merchant.id}
                    value={merchant.name}
                    onSelect={() => {
                      setOpen(false);
                    }}
                  >
                    {merchant.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
