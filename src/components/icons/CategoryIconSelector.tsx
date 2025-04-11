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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TRANSACTION_CATEGORY } from "@/graphql/mutations/updateTransactionCategory";
import { GET_TRANSACTION_CATEGORIES } from "@/graphql/queries/getTransactionCategories";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  transactionId: string;
  category?: TransactionCategory;
};

const CategoryIconSelector: FC<Props> = ({ transactionId, category }) => {
  const { data, loading } = useQuery(GET_TRANSACTION_CATEGORIES);
  const [updateCategory] = useMutation(UPDATE_TRANSACTION_CATEGORY);
  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory | null>(category ?? null);
  const [open, setOpen] = useState(false);

  const icon = selectedCategory?.icon ?? category?.icon;

  const Icon = getCategoryIcon(icon);
  const categories = data?.transactionCategories;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {!selectedCategory && (
          <Tooltip>
            <TooltipContent side="right">
              {!selectedCategory && "Select Category"}
              {!!selectedCategory && selectedCategory.name}
            </TooltipContent>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={"secondary"}
                role="combobox"
                aria-expanded={open}
                disabled={loading}
              >
                <Icon size={25} className="text-gray-400" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
        {selectedCategory && (
          <Tooltip>
            <TooltipContent side="right">
              {!selectedCategory && "Select Category"}
              {selectedCategory && selectedCategory.name}
            </TooltipContent>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                disabled={loading}
              >
                <Icon size={25} />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
      </PopoverTrigger>
      <PopoverContent className="absolute -left-10 w-[200px] p-0 max-h-[400px] overflow-y-scroll">
        <Command>
          {categories && categories.length > 10 && (
            <CommandInput className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No category</CommandEmpty>
            <CommandGroup>
              {categories &&
                categories.map((category) => {
                  const CategoryIcon = getCategoryIcon(category.icon);
                  return (
                    <CommandItem
                      key={category.id}
                      value={category.id}
                      onSelect={(currentValue) => {
                        const item =
                          categories.find(
                            (category) => category.id === currentValue,
                          ) ?? null;
                        setSelectedCategory(item as TransactionCategory);
                        setOpen(false);
                        updateCategory({
                          variables: {
                            transactionIds: [transactionId],
                            categoryId: category.id,
                          },
                        });
                      }}
                    >
                      <CategoryIcon />
                      {category.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          icon === category.icon ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              <CommandItem
                value={undefined}
                onSelect={() => {
                  setSelectedCategory(null);
                  setOpen(false);
                  updateCategory({
                    variables: {
                      transactionIds: [transactionId],
                      categoryId: undefined,
                    },
                  });
                }}
              >
                No category
                <Check
                  className={cn(
                    "ml-auto",
                    icon === undefined ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryIconSelector;
