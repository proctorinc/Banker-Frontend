import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import {
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActiveMonthSelector = () => {
  const {
    selectedMonth,
    months,
    selectMonth,
    selectCurrentMonth,
    selectNextMonth,
    selectPreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    isCurrentMonthSelected,
  } = useActiveMonths();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPreviousMonth()}
        onClick={selectPreviousMonth}
      >
        <ChevronLeft />
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {!selectedMonth && "No months to select"}
            {!!selectedMonth &&
              (value
                ? months.find((month) => month.name === value)?.name
                : `${selectedMonth?.name} ${selectedMonth?.year}`)}
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
                        selectedMonth?.id === month.id
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
      <Tooltip>
        <TooltipContent side="bottom">
          <span>Current month</span>
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled={isCurrentMonthSelected()}
            onClick={selectCurrentMonth}
          >
            <CalendarCheck />
          </Button>
        </TooltipTrigger>
      </Tooltip>
      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextMonth()}
        onClick={selectNextMonth}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ActiveMonthSelector;
