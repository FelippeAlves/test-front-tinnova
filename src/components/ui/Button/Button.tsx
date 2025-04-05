'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large';
type VariantColor = 'default' | 'danger';

type CommonProps = {
    loading?: boolean;
    children: ReactNode;
    className?: string;
    size?: Size;
    variantColor?: VariantColor;
};

export default function Button(
    props: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
) {
    const sizeMap: Record<Size, string> = {
        small: 'w-36',
        medium: 'w-52',
        large: 'w-70',
    };

    const {
        children,
        className,
        size = 'large',
        loading = false,
        variantColor = 'default',
        ...rest
    } = props;

    const colorClasses =
        variantColor === 'danger'
            ? 'bg-[#eb4a46] hover:bg-[#d94440]'
            : 'bg-tinnova-primary-blue hover:bg-tinnova-secondary-blue';

    const baseClasses = `
    ${sizeMap[size]}
    h-12
    ${colorClasses}
    text-white 
    px-4 py-2 
    rounded-full 
    text-sm font-medium 
    transition-colors
    disabled:bg-[#f6f6f6]
    disabled:text-[#dddcdc]
    disabled:cursor-not-allowed
  `;

    return (
        <button {...rest} className={`${baseClasses} ${className || ''}`}>
            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                </div>
            ) : (
                children
            )}
        </button>
    );
}
