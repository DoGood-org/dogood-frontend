import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { JSX } from "react";

type Props = {
  category: string;
  onRemove: () => void;
}
export const FilterBadge = (props: Props): JSX.Element => {
  return (
    <div className="flex items-center gap-2 bg-card h-12 px-6 py-3 border border-card rounded-sm shadow-sm">
      <span>{props.category}</span>
      <Button onClick={props.onRemove} variant="ghost" className="h-8 w-8 p-0">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}