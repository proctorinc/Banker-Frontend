import { CodegenConfig } from "@graphql-codegen/cli";
import Config from "./src/config";

const config: CodegenConfig = {
  schema: Config.SERVER_URL,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
