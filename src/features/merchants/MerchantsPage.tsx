import Layout from "@/app/layout";
import { Card, CardHeader } from "@/components/ui/card";
import { MerchantsDataTable } from "./components/data-table/merchants/MerchantsDataTable";

const MerchantsPage = () => {
  return (
    <Layout title="Merchants">
      <Card>
        <CardHeader>
          <MerchantsDataTable />
        </CardHeader>
      </Card>
    </Layout>
  );
};

export default MerchantsPage;
