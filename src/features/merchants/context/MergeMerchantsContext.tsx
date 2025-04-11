import { Merchant, MerchantKey } from "@/graphql/__generated__/graphql";
import { MERGE_MERCHANTS } from "@/graphql/mutations/mergeMerchants";
import { GET_MERCHANTS } from "@/graphql/queries/getMerchants";
import { useMutation } from "@apollo/client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type MerchantsContextProviderProps = {
  children: ReactNode;
};

type MergeMerchantsContext = {
  loading: boolean;
  submitForm: () => void;
  selectedMerchants: Merchant[];
  name: string | null;
  keys: MerchantKey[];
  selectedKeys: MerchantKey[];
  setSelectedMerchants: Dispatch<SetStateAction<Merchant[]>>;
  setName: Dispatch<SetStateAction<string | null>>;
  setKeys: Dispatch<SetStateAction<MerchantKey[]>>;
  setSelectedKeys: Dispatch<SetStateAction<MerchantKey[]>>;
};

const MergeMerchantsContext = createContext<MergeMerchantsContext | null>(null);

export const MergeMerchantsContextProvider: FC<
  MerchantsContextProviderProps
> = ({ children }) => {
  const [selectedMerchants, setSelectedMerchants] = useState<Merchant[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<MerchantKey[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [keys, setKeys] = useState<MerchantKey[]>([]);
  const [mergeMerchants, { loading }] = useMutation(MERGE_MERCHANTS, {
    refetchQueries: [{ query: GET_MERCHANTS }],
  });

  console.log(selectedKeys);

  function submitForm() {
    if (
      name &&
      name.length > 0 &&
      selectedMerchants.length > 0 &&
      keys.length > 0
    ) {
      mergeMerchants({
        variables: {
          name: name,
          merchantIds: selectedMerchants.map((merchant) => merchant.id),
          keyMatches: selectedKeys.map((key) => ({
            keyMatch: key.keyMatch,
            uploadSource: key.uploadSource,
          })),
        },
      });
    } else {
      console.error("missing form fields");
    }
  }

  const contextData = {
    loading,
    submitForm,
    selectedMerchants,
    name,
    keys,
    selectedKeys,
    setSelectedMerchants,
    setName,
    setKeys,
    setSelectedKeys,
  };

  return (
    <MergeMerchantsContext.Provider value={contextData}>
      {children}
    </MergeMerchantsContext.Provider>
  );
};

export default MergeMerchantsContext;
