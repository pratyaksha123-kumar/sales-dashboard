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
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  delay = 0,
}: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div
      className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive && 'text-success',
                  isNegative && 'text-destructive',
                  !isPositive && !isNegative && 'text-muted-foreground'
                )}
              >
                {isPositive && '+'}
                {change.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', iconBgColor)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </div>
    </div>
  );
}
