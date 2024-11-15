import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { FC, ReactNode } from "react";

type Props = {
  title: ReactNode;
  children: ReactNode;
};

const Layout: FC<Props> = ({ title, children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="top-0 fixed w-full bg-white z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div>{title}</div>
        </header>
        <main className="flex flex-col gap-4 pt-24 p-8 bg-gray-50 flex-grow">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
