import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_MERCHANT } from "@/graphql/queries/getMerchant";
import { Button } from "@/components/ui/button";

type Props = {
  merchantId: string;
  disabled?: boolean;
};

const EditMerchantsButton: FC<Props> = ({ merchantId }) => {
  const { data, loading } = useQuery(GET_MERCHANT, {
    variables: {
      merchantId,
    },
  });
  // const [merchantId, setMerchantId] = useState<Merchant | null>(null);
  const [open, setOpen] = useState(false);

  // function openModal(merchant: Merchant) {
  //   setOpen(true)
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-6" onClick={() => setOpen(true)}>
          <Edit size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Merchant</DialogTitle>
        </DialogHeader>
        {data && data.merchant && (
          <>
            <DialogDescription>{data.merchant.name}</DialogDescription>
            <div className="flex flex-col items-center gap-2 w-full">
              <h1>Merchant keys</h1>
              <div className="grid flex-1 gap-2 w-full">
                {data.merchant.keys.map((key) => (
                  <div key={key.id} className="flex justify-between">
                    <div className="whitespace-nowrap overflow-ellipsis max-w-[100px]">
                      {key.keyMatch}{" "}
                    </div>
                    <Badge>{key.uploadSource}</Badge>
                  </div>
                ))}
              </div>
              <h1>Transactions</h1>
              <div className="grid flex-1 gap-2 w-full">
                {data.merchant.transactions.edges.map(({ node: tx }) => (
                  <div key={tx.id} className="flex justify-between">
                    <div className="whitespace-nowrap overflow-ellipsis max-w-[100px]">
                      {tx.description}
                    </div>
                    <Badge>{tx.date}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {loading && <div>Loading...</div>}
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchantsButton;
