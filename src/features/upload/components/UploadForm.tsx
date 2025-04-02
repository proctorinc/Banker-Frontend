import { FC, FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (file: File) => void;
};

export const UploadForm: FC<Props> = ({ onSubmit }) => {
  return (
    <form>
      <input
        type="file"
        required
        onChange={(event) => {
          event.preventDefault();
          if (event.target.validity.valid && event.target.files) {
            onSubmit(event.target.files[0]);
          }
        }}
      />
    </form>
  );
};
