import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_FUND } from "@/graphql/mutations";
import { useState } from "react";

const CreateBudgetModal = () => {
  const [createFund, { loading, error, data }] = useMutation(CREATE_FUND, {
    refetchQueries: ["getBudgets"],
  });
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  function createSavingsFund() {
    createFund({
      variables: {
        type: "BUDGET",
        name,
        goal: amount,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          New Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Budget</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-[350px] items-center gap-2">
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="goal" className="sr-only">
              Monthly Amount
            </Label>
            <Input
              id="amount"
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(event) => setAmount(parseInt(event.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={() => createSavingsFund()}>Create</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetModal;
