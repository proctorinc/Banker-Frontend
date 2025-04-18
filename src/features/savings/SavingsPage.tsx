import Layout from "@/app/layout";
import {
  SavingsTitle,
  SavingsHistory,
  FundsList,
  SavingsInsights,
} from "./components";

const SavingsPage = () => {
  return (
    <Layout title={<SavingsTitle />}>
      <SavingsHistory />
      <SavingsInsights />
      <FundsList />
    </Layout>
  );
};

export default SavingsPage;
