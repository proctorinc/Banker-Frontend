import Layout from "@/app/layout";
import { FundsList, SavingsInsights, useSavingsPage } from "@/features/savings";

const SavingsPage = () => {
  const { error } = useSavingsPage();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Savings" selectDate>
      <SavingsInsights />
      <FundsList />
    </Layout>
  );
};

export default SavingsPage;
