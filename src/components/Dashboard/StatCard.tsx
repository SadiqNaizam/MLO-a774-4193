import React from 'react';
import { cn } from '@/lib/utils';
import { type LucideProps } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardProps {
  title?: string;
  value: string;
  description: string;
  icon?: React.ElementType<LucideProps>;
  iconContainerClassName?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  className?: string;
  iconPosition?: 'prefix' | 'suffix' | 'descriptionSuffix'; 
  iconTooltip?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: IconComponent,
  iconContainerClassName,
  valueClassName = 'text-3xl font-bold text-prd-primary-text',
  descriptionClassName = 'text-sm text-prd-secondary-text',
  className,
  iconPosition = 'prefix',
  iconTooltip,
}) => {
  const renderIcon = IconComponent && (
    <div className={cn(
      'flex items-center justify-center',
      iconPosition === 'prefix' && 'mr-3',
      iconContainerClassName
    )}>
      <IconComponent className="h-5 w-5 text-prd-secondary-text" />
    </div>
  );

  const iconWithTooltip = IconComponent && iconTooltip ? (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="ml-1 cursor-default">
            <IconComponent className="h-4 w-4 text-prd-secondary-text inline-block" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-neutral-800 text-white text-xs p-2 rounded">
          <p>{iconTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : IconComponent ? (
    <span className="ml-1">
      <IconComponent className="h-4 w-4 text-prd-secondary-text inline-block" />
    </span>
  ) : null;

  return (
    <div className={cn('flex flex-col', className)}>
      {title && <h3 className="text-md font-medium text-prd-primary-text mb-1">{title}</h3>}
      <div className={cn('flex items-start', {'items-center': iconPosition === 'prefix'})}>
        {IconComponent && iconPosition === 'prefix' && renderIcon}
        <div>
          <p className={cn(valueClassName)}>{value}</p>
          <div className={cn('flex items-center', descriptionClassName)}>
            {description}
            {IconComponent && iconPosition === 'descriptionSuffix' && iconWithTooltip}
          </div>
        </div>
        {IconComponent && iconPosition === 'suffix' && <div className="ml-auto">{renderIcon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
