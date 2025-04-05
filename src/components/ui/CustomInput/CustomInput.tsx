'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-400 mb-1 text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={twMerge(
            'w-full border-0 border-b bg-transparent px-1 py-2 transition-colors duration-200 placeholder-[#efeeed] focus:outline-none',
            error
              ? 'border-[#eb4a46] text-[#eb4a46] focus:border-[#eb4a46]'
              : 'border-[#efeeed] text-[#efeeed] focus:text-[#333333] focus:border-[#333333]',
            className
          )}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
