declare module 'class-variance-authority' {
  export function cva(
    base: string,
    config?: {
      variants?: Record<string, Record<string, string>>;
      compoundVariants?: Array<{
        [key: string]: string | boolean;
        class?: string;
      }>;
      defaultVariants?: Record<string, string | boolean>;
    }
  ): (props?: Record<string, string | boolean>) => string;
}
