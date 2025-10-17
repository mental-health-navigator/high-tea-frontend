import { cookies } from 'next/headers';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function HelpLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={undefined} />
        <SidebarInset>
          <div className="flex flex-col min-w-0 h-dvh bg-background">
            <PageHeader />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
