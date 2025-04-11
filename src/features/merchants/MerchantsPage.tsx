import Layout from "@/app/layout";
import { MerchantsDataTable } from "./components/data-table/merchants/MerchantsDataTable";

const MerchantsPage = () => {
  return (
    <Layout title="Merchants">
      <MerchantsDataTable />
    </Layout>
  );
};

export default MerchantsPage;
