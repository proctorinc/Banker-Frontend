import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { Edit } from "lucide-react";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account } from "@/graphql/__generated__/graphql";

import { UPDATE_ACCOUNT } from "@/graphql/mutations/updateAccount";
import { GET_ACCOUNT, GET_ME } from "@/graphql/queries";
import { Logo } from "@/components/logo/Logo";

type Props = {
  account: Account;
  className?: string;
};

const EditAccountModal: FC<Props> = ({ account, className }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: account.id,
    name: account.name || "",
    initialBalance: account.initialBalance || 0,
    logoUrl: account.logoUrl || "",
    website: "",
  });

  const [updateAccount, { error, loading }] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [
      { query: GET_ME },
      {
        query: GET_ACCOUNT,
        variables: {
          id: account.id,
        },
      },
    ],
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAccount({ variables: form });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={className}
          onClick={() => setOpen(true)}
        >
          <Edit size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <DialogDescription>{account.name}</DialogDescription>
        <div className="flex flex-col items-center gap-2 w-full">
          <form onSubmit={handleSubmit} className="space-y-4 w-[300px]">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="initialBalance">Initial Balance</Label>
              <Input
                id="initialBalance"
                type="number"
                value={form.initialBalance}
                onChange={(e) => handleChange("initialBalance", e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                size="icon"
                onClick={() =>
                  handleChange("logoUrl", `https://${form.website}/favicon.ico`)
                }
              >
                <Logo
                  name={form.name}
                  logoUrl={`https://${form.website}/favicon.ico`}
                  size="lg"
                />
              </Button>
              <Button
                type="button"
                size="icon"
                onClick={() =>
                  handleChange(
                    "logoUrl",
                    `https://${form.website}/apple-touch-icon.png`,
                  )
                }
              >
                <Logo
                  name={form.name}
                  logoUrl={`https://${form.website}/apple-touch-icon.png`}
                  size="lg"
                />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() =>
                  handleChange(
                    "logoUrl",
                    `https://www.google.com/s2/favicons?sz=256&domain_url=https://${form.website}`,
                  )
                }
              >
                <Logo
                  name={form.name}
                  logoUrl={`https://www.google.com/s2/favicons?sz=256&domain_url=https://${form.website}`}
                  size="lg"
                />
              </Button>
            </div>
            <Logo name={form.name} logoUrl={form.logoUrl} size="lg" />
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={form.logoUrl}
                onChange={(e) => handleChange("logoUrl", e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Account"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountModal;
