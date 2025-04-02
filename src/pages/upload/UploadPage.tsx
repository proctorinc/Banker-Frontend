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
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
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

const UploadPage = () => {
  const [uploadMutation, { data, loading, called, error }] =
    useMutation(UPLOAD_OFX);
  const [uploadType, setUploadType] = useState("chase-qfx");

  function uploadOFX(file: File) {
    uploadMutation({
      variables: {
        file,
      },
      refetchQueries: [{ query: GET_ME }],
    });
  }

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
              Navigate{" "}
              <Link
                className="text-blue-500 underline"
                to="https://secure.chase.com/web/auth/dashboard#/dashboard/accountDetails/downloadAccountTransactions/index;"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>{" "}
              to download:
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
            <span>{data?.chaseOFXUpload.data[0].account.name}</span>
            <CardDescription>
              <span>
                {data?.chaseOFXUpload.data[0].account.type}
                {data?.chaseOFXUpload.data[0].account.routingNumber &&
                  ` ${data?.chaseOFXUpload.data[0].account.routingNumber}`}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex text-left flex-col">
            <TransactionsPreviewDataTable
              className="h-[40vh]"
              data={data?.chaseOFXUpload.data[0].transactions ?? []}
            />
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default UploadPage;
