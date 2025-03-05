import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="mx-auto flex h-full w-full items-center justify-center">
      <Loader2 className="animate-spin h-14 w-14 text-primary lg:ml-32" />
    </div>
  );
};
