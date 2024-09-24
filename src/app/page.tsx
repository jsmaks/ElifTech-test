"use client";



// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspacesModal } from "@/features/workspaces/store/use-create-workspaces-modal";
import { useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";
import { UserButton } from "./projects/auth/components/user-button";

export default function Home() {
  const router = useRouter();
  // const [open, setOpen] = useCreateWorkspacesModal();
  // const { data, isLoading } = useGetWorkspaces();

  // const workspacesId = useMemo(() => data?.[0]?._id, [data]);

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (workspacesId) {
  //     router.replace(`/workspace/${workspacesId}`);
  //   } else if (!open) {
  //     setOpen(true);
  //   }
  // }, [workspacesId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
