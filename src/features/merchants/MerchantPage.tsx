import Layout from "@/app/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import {
  Merchant,
  SpendingHistory,
  Transaction,
  TransactionCategory,
} from "@/graphql/__generated__/graphql";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_MERCHANT } from "@/graphql/queries/getMerchant";
import { Label } from "@/components/ui/label";
import EditMerchantsButton from "./modal/EditMerchantModalButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Check, Plus, Square, SquareCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GET_TRANSACTION_CATEGORIES } from "@/graphql/queries/getTransactionCategories";
import { LINK_MERCHANT_TO_TRANSACTION_CATEGORY } from "@/graphql/mutations/updateMerchantTransactionCategory";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getCategoryIcon } from "@/utils/icons";
import { UPDATE_MERCHANT } from "@/graphql/mutations/updateMerchant";
import { MerchantLogo } from "./components/MerchantLogo";
import { MerchantHistoryBarChart } from "./components/charts/MerchantHistoryBarChart";
import useActiveMonths from "../activeMonths/hooks/useActiveMonths";
import { nameToColor } from "@/utils/utils";

const MerchantPage = () => {
  const { merchantId } = useParams();
  const { selectedMonth } = useActiveMonths();
  const { data, refetch, loading } = useQuery(GET_MERCHANT, {
    variables: {
      id: merchantId as string,
      first: INITIAL_PAGE_SIZE,
      startDate: selectedMonth?.start,
      endDate: selectedMonth?.end,
    },
    skip: !merchantId || !selectedMonth,
  });
  const [open, setOpen] = useState(false);
  const { data: categoryData } = useQuery(GET_TRANSACTION_CATEGORIES);
  const [linkMerchantCategory] = useMutation(
    LINK_MERCHANT_TO_TRANSACTION_CATEGORY,
  );
  const [updateMerchant] = useMutation(UPDATE_MERCHANT);
  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory | null>(null);
  const categories = categoryData?.transactionCategories;

  const transactions =
    data?.merchant?.transactions.edges.map(({ node }) => node as Transaction) ??
    [];

  const totalTransactions =
    data?.merchant?.transactions.pageInfo.totalCount ?? 0;

  const linkedCategory = data?.merchant?.linkedCategory;
  const LinkedCategoryIcon = getCategoryIcon(linkedCategory?.icon);

  function fetchPage(pageSize: number, cursor: string | null) {
    refetch({
      id: merchantId as string,
      first: pageSize,
      after: cursor,
    });
  }

  function markAsPrimaryIncome() {
    if (!data?.merchant) return;
    updateMerchant({
      variables: {
        id: data.merchant.id,
        isPrimaryIncome: !data.merchant.isPrimaryIncome,
      },
    });
  }

  return (
    <PaginationContextProvider>
      <Layout
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/merchants">Merchants</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {loading && (
                  <Skeleton className="w-[125px] h-[20px] rounded-xl" />
                )}
                {!loading && data?.merchant?.name}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <Card>
          <CardHeader className="flex flex-col gap-3">
            <CardTitle className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex w-full items-center gap-3">
                  {!loading && data?.merchant && (
                    <MerchantLogo
                      merchant={data.merchant as Merchant}
                      size="lg"
                    />
                  )}
                  {loading && (
                    <div className="flex gap-2 items-center">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="w-[75px] h-[16px] rounded-xl" />
                        <Skeleton className="w-[125px] h-[16px] rounded-xl" />
                      </div>
                    </div>
                  )}
                  {!loading && data?.merchant && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Merchant:</Label>
                      <h1>{data.merchant.name}</h1>
                    </div>
                  )}
                  {data?.merchant && (
                    <EditMerchantsButton merchant={data.merchant as Merchant} />
                  )}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            {data?.merchant?.isPrimaryIncome && (
              <Button
                onClick={() => markAsPrimaryIncome()}
                size="sm"
                variant="secondary"
              >
                <SquareCheck size={8} />
                Primary income
              </Button>
            )}
            {!data?.merchant?.isPrimaryIncome && (
              <Button
                onClick={() => markAsPrimaryIncome()}
                size="sm"
                variant="outline"
              >
                <Square size={8} />
                Set as primary income
              </Button>
            )}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button size="sm" variant="outline">
                  <Plus size={8} />
                  Link to account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link to account</DialogTitle>
                  <DialogDescription>
                    Linking to an account means that the account will be the
                    source of all of this merchant's transactions.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={data?.merchant?.isPrimaryIncome}
                >
                  {linkedCategory && (
                    <>
                      <LinkedCategoryIcon size={8} />
                      {linkedCategory.name}
                    </>
                  )}
                  {!linkedCategory && (
                    <>
                      <Plus size={8} />
                      Link to category
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link to category</DialogTitle>
                  <DialogDescription>
                    All current and future transactions from this merchant will
                    be linked to the selected category.
                  </DialogDescription>
                  <Command>
                    {categories && categories.length > 10 && (
                      <CommandInput className="h-9" />
                    )}
                    <CommandList>
                      <CommandEmpty>No category</CommandEmpty>
                      <CommandGroup>
                        <CommandItem onSelect={() => setSelectedCategory(null)}>
                          No category
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCategory === null
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
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
                                      (category) =>
                                        category.id === currentValue,
                                    ) ?? null;
                                  setSelectedCategory(
                                    item as TransactionCategory,
                                  );
                                }}
                              >
                                <CategoryIcon />
                                {category.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    selectedCategory?.id === category.id
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
                </DialogHeader>
                <DialogFooter>
                  <Button
                    disabled={
                      linkedCategory === null && selectedCategory === null
                    }
                    onClick={() => {
                      setOpen(false);
                      linkMerchantCategory({
                        variables: {
                          merchantId: merchantId as string,
                          categoryId: selectedCategory?.id,
                        },
                      });
                    }}
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-2 pb-0">
            {data?.merchant?.spendingHistory.length === 0 && "NO DATA"}
            <MerchantHistoryBarChart
              color={nameToColor(data?.merchant?.name ?? "")}
              chartData={data?.merchant?.spendingHistory as SpendingHistory[]}
            />
          </CardHeader>
        </Card>
        <TransactionsTable
          className="h-[45vh]"
          data={transactions}
          totalRows={totalTransactions}
          fetchPage={fetchPage}
          loading={loading}
        />
      </Layout>
    </PaginationContextProvider>
  );
};

export default MerchantPage;
