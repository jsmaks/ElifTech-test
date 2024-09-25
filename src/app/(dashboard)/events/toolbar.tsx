import { UserButton } from "@/features/auth/components/user-button";

export const Toolbar = () => {
  return (
    <div className="flex items-center justify-between py-1.5 container">
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
};
