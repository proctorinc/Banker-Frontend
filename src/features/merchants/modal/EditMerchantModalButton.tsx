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
import { Merchant } from "@/graphql/__generated__/graphql";
import { UPDATE_MERCHANT } from "@/graphql/mutations/updateMerchant";
import { Logo } from "@/components/logo/Logo";

type Props = {
  merchant: Merchant;
  className?: string;
};

const EditMerchantsButton: FC<Props> = ({ merchant, className }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: merchant.id,
    name: merchant.name || "",
    isPrimaryIncome: merchant.isPrimaryIncome || false,
    logoUrl: merchant.logoUrl || "",
    website: merchant.name
      ? `www.${merchant.name.toLowerCase().replace(/ /g, "")}.com`
      : "",
    // accountId: merchant.linkedAccountId || "",
    // categoryId: merchant.linkedCategory.name || "",
  });

  const [updateMerchant, { error, loading }] = useMutation(UPDATE_MERCHANT);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMerchant({ variables: form });
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
          <DialogTitle>Edit Merchant</DialogTitle>
        </DialogHeader>
        <DialogDescription>{merchant.name}</DialogDescription>
        <div className="flex flex-col items-center gap-2 w-full">
          {/* <h1>Merchant keys</h1>
          <div className="grid flex-1 gap-2 w-full">
            {merchant.keys.map((key) => (
              <div key={key.id} className="flex justify-between">
                <div className="whitespace-nowrap overflow-ellipsis max-w-[100px]">
                  {key.keyMatch}{" "}
                </div>
                <Badge>{key.uploadSource}</Badge>
              </div>
            ))}
          </div> */}
          <form onSubmit={handleSubmit} className="space-y-4 w-[300px]">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* <div className="flex items-center space-x-2">
                  <Switch
                    id="isPrimaryIncome"
                    checked={form.isPrimaryIncome}
                    onCheckedChange={(value) =>
                      handleChange("isPrimaryIncome", value)
                    }
                  />
                  <Label htmlFor="isPrimaryIncome">Primary Income</Label>
                </div> */}

            {/* <div>
                  <Label htmlFor="sourceId">Source ID</Label>
                  <Input
                    id="sourceId"
                    value={form.sourceId}
                    onChange={(e) => handleChange("sourceId", e.target.value)}
                  />
                </div> */}

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
            {/*
            <div>
              <Label htmlFor="accountId">Account ID</Label>
              <Input
                id="accountId"
                value={form.accountId}
                onChange={(e) => handleChange("accountId", e.target.value)}
              />
            </div> */}

            {/* <div>
                  <Label htmlFor="categoryId">Category ID</Label>
                  <Input
                    id="categoryId"
                    value={form.categoryId}
                    onChange={(e) => handleChange("categoryId", e.target.value)}
                  />
                </div> */}

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Merchant"}
            </Button>

            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </form>
          {/* <h1>Transactions</h1>
              <div className="grid flex-1 gap-2 w-full">
                {data.merchant.transactions.edges.map(({ node: tx }) => (
                  <div key={tx.id} className="flex justify-between">
                    <div className="whitespace-nowrap overflow-ellipsis max-w-[100px]">
                      {tx.description}
                    </div>
                    <Badge>{tx.date}</Badge>
                  </div>
                ))}
              </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchantsButton;
