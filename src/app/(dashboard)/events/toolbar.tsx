// import { useWorkspaceId } from "@/app/hooks/use-workspace-id";

import { UserButton } from "@/features/auth/components/user-button";
// import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export const Toolbar = () => {
  // const workspaceId = useWorkspaceId();
  // const {data} = useGetWorkspace({ id: workspaceId });
  return (
    <div className="bg-[#ddc0b7] flex items-center justify-between py-1.5 container">
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
};
