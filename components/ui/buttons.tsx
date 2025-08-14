import { LoaderCircle } from "lucide-react";

export const SubmitButton = ({
  name,
  isPending,
}: {
  name: string;
  isPending?: boolean;
}) => {
  return (
    <div className="w-full">
      {isPending ? (
        <button
          type="button"
          className="flex gap-2 justify-center items-center bg-black text-white rounded-xl w-full h-[33px]"
        >
          <LoaderCircle className="animate-spin" />
        </button>
      ) : (
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-white rounded-xl w-full h-[33px]"
        >
          {name}
        </button>
      )}
    </div>
  );
};
