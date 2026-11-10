'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      richColors
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-brand-surface group-[.toaster]:text-brand-icewhite group-[.toaster]:border-brand-line group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl text-xs font-sans',
          description: 'group-[.toast]:text-brand-silver text-xs',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground text-xs font-medium',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground text-xs font-medium',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
