import Layout from "@/app/layout";
import { UploadForm } from "@/features/upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@apollo/client";
import { UPLOAD_OFX } from "@/graphql/mutations/uploadOFX";
import { GET_ME } from "@/graphql/queries";
import { TransactionsPreviewDataTable } from "./components/data-table/TransactionPreviewDataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo/Logo";

const UploadPage = () => {
  const [uploadMutation, { data, loading, called }] = useMutation(UPLOAD_OFX);
  const [uploadType, setUploadType] = useState("chase-qfx");

  function uploadOFX(file: File) {
    uploadMutation({
      variables: {
        file,
      },
      refetchQueries: [{ query: GET_ME }],
    });
  }

  const account = data?.chaseOFXUpload.data[0].account;
  const existingAccount = account?.duplicate;

  return (
    <Layout title="Upload">
      <Select
        value={uploadType}
        onValueChange={(value) => setUploadType(value)}
      >
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue
            defaultValue="chase-ofx"
            placeholder="Select upload type"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="chase-qfx">
              <div className="flex gap-2">
                <Badge>Chase</Badge>
                .QFX/.QBO
              </div>
            </SelectItem>
            <SelectItem disabled={true} value="captial-one">
              <div className="flex gap-2">
                <Badge>Capital One</Badge>
                .OFX
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {uploadType === "chase-qfx" && (
        <Card>
          <CardHeader>
            <UploadForm onSubmit={uploadOFX} />
            <CardDescription>
              <Link
                className="text-blue-500 underline"
                to="https://secure.chase.com/web/auth/dashboard#/dashboard/accountDetails/downloadAccountTransactions/index;"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download from Chase
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {!called && (
        <Card className="bg-muted">
          <CardHeader className="flex justify-center items-center h-[60vh] text-muted-foreground text-sm font-normal">
            <div className="flex flex-col gap-3 items-center">
              <div className="bg-gray-500 rounded-full p-3">
                <Upload className="text-muted" size={32} />
              </div>
              <h2>Upload to preview data</h2>
            </div>
          </CardHeader>
        </Card>
      )}
      {called && (
        <Card>
          <CardHeader>
            <div className="flex w-full items-center gap-3">
              {loading && (
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="w-[75px] h-[16px] rounded-xl" />
                    <Skeleton className="w-[125px] h-[16px] rounded-xl" />
                  </div>
                </div>
              )}
              {!loading && existingAccount && (
                <Logo
                  name={existingAccount.name}
                  logoUrl={existingAccount.logoUrl}
                  size="lg"
                />
              )}
              {!loading && existingAccount && (
                <div className="space-y-2">
                  <h1>{existingAccount.name}</h1>
                  <Label className="text-muted-foreground">
                    {existingAccount.type}
                  </Label>
                </div>
              )}
              {!loading && account && !existingAccount && (
                <div className="space-y-2">
                  <h1>New Account:</h1>
                  <CardDescription>
                    <h1>{account.name}</h1>
                    <Badge>{account.type}</Badge>
                  </CardDescription>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex text-left flex-col">
            <TransactionsPreviewDataTable
              className="h-[40vh]"
              data={data?.chaseOFXUpload.data[0].transactions}
            />
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default UploadPage;
