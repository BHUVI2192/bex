
import { Input } from "@/components/ui/input";

interface NewsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const NewsSearchBar = ({ searchTerm, onSearchChange }: NewsSearchBarProps) => {
  return (
    <div className="w-1/2">
      <Input
        placeholder="Search by title or category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
