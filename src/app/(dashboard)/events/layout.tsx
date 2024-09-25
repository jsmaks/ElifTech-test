"use client";

import { Separator } from "@/components/ui/separator";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}
const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full container">
      <Toolbar />
      <Separator className="my-5" />
      <div>{children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;
