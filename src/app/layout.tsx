import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout: FC<Props> = ({ title, children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="top-0 fixed w-full bg-white z-10 flex h-16 shrink-0 items-center gap-4 border-b px-8">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="w-full">
            <h1>{title}</h1>
          </div>
        </header>
        <main className="flex pt-24 p-8 bg-gray-50 flex-grow justify-center w-full">
          <div className="w-full max-w-[1000px] gap-6 flex flex-col ">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
