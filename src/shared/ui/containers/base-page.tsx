import "server-only";

export type BasePageProps = {
  children: React.ReactNode;
  className?: string;
};

export async function BasePage({ children, className }: BasePageProps) {
  return <div className={className}>{children}</div>;
}
