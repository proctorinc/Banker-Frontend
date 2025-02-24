import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const ActiveMonthSelector = () => {
  const { currentMonth, months, selectMonth } = useActiveMonths();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? months.find((month) => month.name === value)?.name
            : `${currentMonth?.name} ${currentMonth?.year}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Month" />
          <CommandList>
            <CommandEmpty>No month found.</CommandEmpty>
            <CommandGroup>
              {months.map((month) => (
                <CommandItem
                  key={month.id}
                  value={month.name + " " + month.year}
                  onSelect={() => {
                    selectMonth(month.id);
                    setValue("");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentMonth?.id === month.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {month.name} {month.year}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ActiveMonthSelector;
