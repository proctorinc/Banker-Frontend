import useUser from "@/features/auth/hooks/useUser";

export const useSidebarContent = () => {
  const currentUser = useUser();

  const data = {
    navMain: [
      {
        title: "Home",
        url: "#",
        open: true,
        isActive: true,
      },
      {
        title: "Accounts",
        url: "#",
        open: true,
        items: currentUser.accounts.edges.map(({ node: account }) => {
          return {
            title: account.name,
            url: "#",
          };
        }),
      },
      {
        title: "Transactions",
        url: "#",
        open: false,
      },
      {
        title: "Merchants",
        url: "#",
        open: false,
      },
      {
        title: "Upload",
        url: "#",
        open: false,
        items: [
          {
            title: "Chase Upload",
            url: "#",
          },
        ],
      },
    ],
  };

  return data;
};
