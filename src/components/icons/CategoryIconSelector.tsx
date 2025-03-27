import { FC, useState } from "react";
import { getCategoryIcon } from "@/utils/icons";
import { TransactionCategory } from "@/graphql/__generated__/graphql";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const categories: TransactionCategory[] = [
  {
    id: "1",
    name: "Transfer",
    icon: "transfer-icon",
    isTransfer: true,
    color: "",
  },
  {
    id: "2",
    name: "Income",
    icon: "income-icon",
    isTransfer: false,
    color: "",
  },
  {
    id: "3",
    name: "Monthly budget",
    icon: "budget-icon",
    isTransfer: false,
    color: "",
  },
  {
    id: "4",
    name: "One time Purchase",
    icon: "one-time-icon",
    isTransfer: false,
    color: "",
  },
];

type Props = {
  category?: TransactionCategory;
};

const CategoryIconSelector: FC<Props> = ({ category }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | undefined>(
    category?.icon,
  );
  const [open, setOpen] = useState(true);

  const Icon = getCategoryIcon(selectedIcon);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="h-6"
          variant="ghost"
          role="combobox"
          aria-expanded={open}
        >
          {selectedIcon ? <Icon /> : <PlusCircle />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute -left-10 w-[200px] p-0 max-h-[400px] overflow-y-scroll">
        <Command>
          {categories.length > 2 && <CommandInput className="h-9" />}
          <CommandList>
            <CommandEmpty>No matching category</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => {
                const CategoryIcon = getCategoryIcon(category.icon);
                return (
                  <CommandItem
                    key={category.id}
                    value={category.icon}
                    onSelect={(currentValue) => {
                      setSelectedIcon(
                        currentValue === selectedIcon ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <CategoryIcon />
                    {category.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedIcon === category.icon
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryIconSelector;
