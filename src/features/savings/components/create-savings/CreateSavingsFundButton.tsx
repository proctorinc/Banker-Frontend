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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

export const CreateSavingsFundButton = () => {
  const [createFund, { loading, error, data }] = useMutation(CREATE_FUND, {
    refetchQueries: ["getSavingsFunds"],
  });
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [open, setOpen] = useState(false);

  function createSavingsFund() {
    createFund({
      variables: {
        type: "SAVINGS",
        name,
        goal,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          New Fund
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Savings Fund</DialogTitle>
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
            <Collapsible
              open={open}
              onOpenChange={setOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex gap-2 items-center">
                  <Checkbox checked={open} />
                  Goal
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                <Label htmlFor="goal" className="sr-only">
                  Goal
                </Label>
                <Input
                  id="goal"
                  placeholder="How much do you want to save?"
                  type="number"
                  value={goal}
                  onChange={(event) => setGoal(parseInt(event.target.value))}
                />
              </CollapsibleContent>
            </Collapsible>
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
