import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  delay?: number;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  iconBgColor = 'bg-primary/15',
  iconColor = 'text-primary',
  delay = 0,
}: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className="group bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/40 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-sm font-semibold px-2 py-0.5 rounded-md',
                  isPositive && 'text-success bg-success/10',
                  isNegative && 'text-destructive bg-destructive/10',
                  !isPositive && !isNegative && 'text-muted-foreground bg-muted'
                )}
              >
                {isPositive && '+'}
                {change.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl transition-all duration-300 group-hover:scale-110', iconBgColor)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
    </div>
  );
}
