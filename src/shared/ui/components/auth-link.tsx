import Link from "next/link";

export type AuthLinkProps = {
  children: React.ReactNode;
  href: string;
  message?: string;
};

function AuthLink({ children, message, href }: AuthLinkProps) {
  return (
    <div className="mt-6 text-center text-sm">
      {message && <span className="text-muted-foreground">{message} </span>}
      <Link href={href} className="font-medium text-primary hover:underline">
        {children}
      </Link>
    </div>
  );
}

export { AuthLink };
