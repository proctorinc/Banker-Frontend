import Layout from "@/app/layout";
import { UploadForm } from "@/features/upload";

const UploadPage = () => {
  // const { isLoading, error } = useSavingsPage();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <Layout title="Upload" selectDate>
      <UploadForm />
    </Layout>
  );
};

export default UploadPage;
