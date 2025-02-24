// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { UPLOAD_OFX } from "@/graphql/mutations/uploadOFX";

// const MAX_FILE_SIZE = 5 * 1_000_000; // 5MB
// const ACCEPTED_FILE_TYPES = [".qfx"];

// const formSchema = z.object({
//   file: z
//     .instanceof(File)
//     .refine((file) => !!file, "No file selected to upload")
//     .refine((file) => file?.size < MAX_FILE_SIZE, `Max file size is 5MB.`)
//     .refine(
//       (file) => ACCEPTED_FILE_TYPES.includes(String(file?.type).toLowerCase()),
//       "Only .QFX filetype is supported.",
//     ),
// });

export const UploadForm = () => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // });
  const [uploadOFXMutation] = useMutation(UPLOAD_OFX);

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   uploadOFXMutation({
  //     variables: {
  //       file: values.file,
  //     },
  //   })
  //     .then((response) => console.log(response.data))
  //     .catch(() => console.error("Failed to upload"));
  // }

  return (
    <Card>
      <CardHeader>Chase QFX Upload</CardHeader>
      <CardContent>
        <input
          type="file"
          required
          onChange={(res) => {
            if (res.target.validity.valid)
              uploadOFXMutation({
                variables: {
                  file: res.target.files ? res.target.files[0] : null,
                },
              });
          }}
        />
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    Upload a Chase QFX transaction file.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
      </CardContent>
    </Card>
  );
};
