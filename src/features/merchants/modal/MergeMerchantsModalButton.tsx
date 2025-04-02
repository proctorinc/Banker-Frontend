import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Merchant } from "@/graphql/__generated__/graphql";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMergeMerchantsForm } from "../hooks/useMergeMerchantsForm";
import { MerchantKeysDataTable } from "../components/data-table/merchant-keys/MerchantKeysDataTable";

type Props = {
  merchants: Merchant[];
};

const MergeMerchantsModalButton: FC<Props> = ({ merchants }) => {
  const [open, setOpen] = useState(false);
  const {
    setName,
    submitForm,
    selectedMerchants,
    setSelectedMerchants,
    loading,
  } = useMergeMerchantsForm();

  function toggleModal(open: boolean) {
    if (open === true) {
      setSelectedMerchants(merchants);
      setName(merchants[0].name);
    }
    setOpen(open);
  }

  function mergeMerchants() {
    submitForm();
    setOpen(false);
    setName("");
    setSelectedMerchants([]);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button disabled={merchants.length === 0}>Merge</Button>
      </DialogTrigger>
      <DialogContent>
        {selectedMerchants.length > 0 && (
          <>
            <DialogHeader>
              <DialogTitle>Merge Merchants</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Merge multiple merchants together into one. Configure the keys to
              map this merchant to future transactions.
            </DialogDescription>
            <h2 className="font-semibold">Merchant Details</h2>
            <Select
              onValueChange={setName}
              defaultValue={selectedMerchants[0].name}
            >
              <SelectTrigger className="w-fit">
                <div className="flex items-center justify-between gap-3 w-fit pr-3">
                  <Label>Name:</Label>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="overflow-y-auto max-h-[400px]">
                <SelectGroup>
                  {selectedMerchants.map((merchant) => (
                    <SelectItem key={merchant.id} value={merchant.name}>
                      {merchant.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <MerchantKeysDataTable merchants={merchants} />
            <DialogFooter>
              <Button onClick={() => mergeMerchants()}>
                Merge {selectedMerchants.length} merchants
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MergeMerchantsModalButton;
