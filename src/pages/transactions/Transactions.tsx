import Layout from "@/app/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_TRANSACTIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import TransactionsTable from "./table/transactions-table";
import usePaginate from "@/hooks/usePaginate";

const Transactions = () => {
  const { pageSize } = usePaginate();
  const { loading, error, data, fetchMore } = useQuery(GET_TRANSACTIONS, {
    variables: {
      first: 10,
    },
  });

  function onNextPage() {
    fetchMore({
      variables: {
        first: pageSize,
        after:
          data?.transactions.edges[data?.transactions.edges.length - 1].cursor,
      },
    });
  }

  function onPreviousPage() {
    fetchMore({
      variables: {
        first: pageSize,
        after: data?.transactions.edges[0].cursor,
      },
    });
  }

  const transactions = data
    ? data.transactions.edges.map(({ node }) => node)
    : [];
  const pageCount =
    data && data.transactions.pageInfo.totalCount
      ? Math.ceil(data.transactions.pageInfo.totalCount / pageSize)
      : 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Transactions">
      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 relative">
            <TransactionsTable
              data={transactions}
              pageCount={pageCount}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// <Card>
//   <CardHeader>
//     <CardTitle>Transactions</CardTitle>
//   </CardHeader>
//   <CardContent className="flex flex-col gap-4 relative">
//     <Table>
//       <TableHeader>
//         <TableHead>Merchant</TableHead>
//         <TableHead>Amount</TableHead>
//         <TableHead>Description</TableHead>
//         <TableHead>Date</TableHead>
//       </TableHeader>
//       <TableBody>
//         {data &&
//           data.transactions &&
//           data.transactions.edges.map(({ node: transaction }) => (
//             <TableRow key={transaction.id}>
//               <TableCell>
//                 <span className="line-clamp-1">
//                   {transaction.merchant.name}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 {transaction.amount >= 0 && (
//                   <span className="line-clamp-1 text-emerald-500">
//                     +{transaction.amount}
//                   </span>
//                 )}
//                 {transaction.amount < 0 && (
//                   <span className="line-clamp-1 text-red-500">
//                     {transaction.amount}
//                   </span>
//                 )}
//               </TableCell>
//               <TableCell>
//                 <span className="line-clamp-1">
//                   {transaction.description}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 {new Date(transaction.date).toLocaleString("en-US", {
//                   month: "numeric",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </TableCell>
//             </TableRow>
//           ))}
//       </TableBody>
//     </Table>
//     <CardFooter>
//       <Pagination>
//         <PaginationContent>
//           {data?.transactions.pageInfo.hasPreviousPage && (
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() =>
//                   fetchMore({
//                     variables: {
//                       first: pageSize,
//                       after: data?.transactions.edges[0].cursor,
//                     },
//                   })
//                 }
//               />
//             </PaginationItem>
//           )}
//           {/* <PaginationItem>
//             <PaginationLink href="#">1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem> */}
//           {data?.transactions.pageInfo.hasNextPage && (
//             <PaginationItem>
//               <PaginationNext
//                 onClick={() =>
//                   fetchMore({
//                     variables: {
//                       first: pageSize,
//                       after:
//                         data?.transactions.edges[
//                           data?.transactions.edges.length - 1
//                         ].cursor,
//                     },
//                   })
//                 }
//               />
//             </PaginationItem>
//           )}
//         </PaginationContent>
//       </Pagination>
//       <div className="absolute right-4">
//         <DropdownMenu>
//           <div className="flex gap-4 items-center">
//             <span className="text-sm">Items per page</span>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 {pageSize}
//                 <ChevronUp className="ml-auto" />
//               </Button>
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent side="top" className="mr-8">
//             {pageSizes.map((size) => (
//               <DropdownMenuItem
//                 key={size}
//                 onClick={() => {
//                   updatePageSize(size);
//                   refetch({
//                     first: size,
//                   });
//                 }}
//               >
//                 <span>{size}</span>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </CardFooter>
//   </CardContent>
// </Card>
// <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />

export default Transactions;
