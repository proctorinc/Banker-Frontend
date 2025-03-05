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

const UploadPage = () => {
  return (
    <Layout title="Upload">
      <div className="flex gap-2">
        <h1>Chase</h1>
        <Badge>QFX</Badge>
      </div>
      <Card>
        <CardHeader>
          <UploadForm />
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
        <CardContent className="flex text-left flex-col">
          <div>Checking Account 2001: Last updated 2/23/25</div>
          <div>Credit Card 3411: Last updated 2/23/25</div>
          <div>Credit Card 6268: Last updated 2/23/25</div>
          <div>Savings Account 1076: Last updated 2/23/25</div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <h1>Capital One</h1>
        <Badge>QFX</Badge>
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-bold italic">This option is not supported yet</h2>
          <CardDescription>
            <p>
              Navigate{" "}
              <Link
                className="text-blue-500 underline"
                to="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>{" "}
              to download:
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex text-left flex-col">
          <div>No accounts have been uploaded yet.</div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default UploadPage;
