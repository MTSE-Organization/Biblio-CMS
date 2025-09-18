'use client';

import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import Button from '@/components/form/button';
import ToolTip from '@/components/form/tooltip';

type NumberFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  formItemClassName?: string;
  required?: boolean;
  labelClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  step?: number;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  delimiter?: string;
};

const formatNumber = (val: number, delimiter: string) =>
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

const unformatNumber = (val: string, delimiter: string) =>
  val.replace(new RegExp(`\\${delimiter}`, 'g'), '');

export default function NumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  formItemClassName,
  required,
  labelClassName,
  disabled,
  readOnly = false,
  prefixIcon,
  suffixIcon,
  step = 1,
  min,
  max,
  allowNegative = false,
  delimiter = '.' // mặc định là `.`
}: NumberFieldProps<T>) {
  const [raw, setRaw] = useState<string>('');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const currentValue = Number(field.value ?? 0);

        const commit = (val: number) => {
          let next = val;
          if (!allowNegative && next < 0) {
            next = min !== undefined ? Math.max(min, 0) : 0;
          }
          if (min !== undefined && next < min) next = min;
          if (max !== undefined && next > max) next = max;

          field.onChange(next);
          setRaw(formatNumber(next, delimiter));
        };

        const increment = () => commit(currentValue + step);
        const decrement = () => commit(currentValue - step);

        return (
          <FormItem
            className={cn(
              { 'cursor-not-allowed opacity-50': disabled },
              formItemClassName
            )}
          >
            {label && (
              <FormLabel className={cn('ml-1 gap-1.5', labelClassName)}>
                {label}
                {required && <span className='text-destructive'>*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div className='relative flex items-center'>
                <div className='relative flex-1'>
                  {prefixIcon && (
                    <div className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'>
                      {prefixIcon}
                    </div>
                  )}
                  <Input
                    placeholder={placeholder}
                    type='text'
                    disabled={disabled}
                    readOnly={readOnly}
                    value={raw || formatNumber(currentValue, delimiter)}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRaw(val);

                      if (val === '' || (val === '-' && allowNegative)) {
                        return;
                      }

                      const parsed = Number(unformatNumber(val, delimiter));
                      if (!Number.isNaN(parsed)) {
                        commit(parsed);
                      }
                    }}
                    onBlur={() => {
                      if (raw === '' || raw === '-') {
                        setRaw(formatNumber(currentValue, delimiter));
                        return;
                      }
                      const parsed = Number(unformatNumber(raw, delimiter));
                      if (!Number.isNaN(parsed)) commit(parsed);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        increment();
                      }
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        decrement();
                      }
                    }}
                    className={cn(
                      className,
                      'pt-0! pb-0 font-normal',
                      {
                        'pl-10': prefixIcon,
                        'pr-10': suffixIcon,
                        'cursor-not-allowed opacity-50': disabled,
                        'border-red-500 focus-visible:border-red-500 focus-visible:ring-[1px] focus-visible:ring-red-500':
                          fieldState.error
                      },
                      !fieldState.error &&
                        'focus-visible:ring-dodger-blue focus-visible:border-transparent focus-visible:ring-2'
                    )}
                  />
                  {suffixIcon && (
                    <div className='text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2'>
                      {suffixIcon}
                    </div>
                  )}
                </div>
                <div className='ml-1 flex flex-col gap-1'>
                  <ToolTip title='Tăng'>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={increment}
                      disabled={
                        disabled || (max !== undefined && currentValue >= max)
                      }
                      className='h-4 w-4 rounded'
                    >
                      +
                    </Button>
                  </ToolTip>
                  <ToolTip title='Giảm'>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={decrement}
                      disabled={
                        disabled || (min !== undefined && currentValue <= min)
                      }
                      className='h-4 w-4 rounded'
                    >
                      –
                    </Button>
                  </ToolTip>
                </div>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className='mb-0 ml-1' />
          </FormItem>
        );
      }}
    />
  );
}
