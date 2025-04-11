import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

import { FC, ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/card";

type Props = {
  title: ReactNode;
  children: ReactNode;
};

const Layout: FC<Props> = ({ title, children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-gray-50 flex flex-grow justify-center w-full p-4">
          <Card className="w-full max-w-[1000px]">
            <CardHeader className="p-4">
              <header className="w-full flex items-center gap-4 px-4 pt-2">
                <div className="w-full">
                  {typeof title === "string" ? <h1>{title}</h1> : title}
                </div>
              </header>
              <main className="flex flex-grow justify-center w-full">
                <div className="w-full gap-4 flex flex-col p-4">{children}</div>
              </main>
            </CardHeader>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
