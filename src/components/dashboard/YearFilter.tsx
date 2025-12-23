import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface YearFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function YearFilter({ value, onChange }: YearFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px] bg-card border-border">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2026">2026</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
