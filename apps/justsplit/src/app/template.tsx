// Force all pages to be dynamic to avoid SSG issues
export const dynamic = 'force-dynamic';

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}