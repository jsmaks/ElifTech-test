"use client";

import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}
const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full container">
 
        <Toolbar />
        <div className="flex h-[calc(100vh-60px)]">{children}</div>
    
    </div>
  );
};

export default WorkspaceIdLayout;
