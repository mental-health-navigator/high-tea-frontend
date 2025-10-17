'use client';

import { useRouter, usePathname } from 'next/navigation';
import { memo, useCallback } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { SidebarToggle } from './sidebar-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useSidebar } from './ui/sidebar';

function PurePageHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();

  const handleQuickClose = useCallback(() => {
    // Replace current page in history to prevent back button from returning here
    window.location.replace('https://www.google.com');
  }, []);

  return (
    <header className="flex sticky top-0 py-1.5 items-center px-2 gap-2 justify-between m-3 z-50">
      <div className="md:hidden">
        <SidebarToggle />
      </div>
      <div className="hidden md:contents">
        <Image src="/images/logo.png" alt="Logo" width={132} height={32} />
        <div className="flex gap-12">
          <Button 
            variant={pathname === '/' ? 'default' : 'ghost'} 
            onClick={() => router.push('/')}
          >
            Search
          </Button>
          <Button 
            variant={pathname === '/help' ? 'default' : 'ghost'} 
            onClick={() => router.push('/help')}
          >
            Help
          </Button>
          <Button 
            variant={pathname === '/about' ? 'default' : 'ghost'} 
            onClick={() => router.push('/about')}
          >
            About
          </Button>
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'secondary'}
            onPointerDown={handleQuickClose}
            aria-label="Quick exit - redirects to Google search"
            className="!text-[#606C38] !bg-background/80 hover:!bg-background/90"
          >
            Quick Close
          </Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          This will navigate you to Google search
        </TooltipContent>
      </Tooltip>
    </header>
  );
}

export const PageHeader = memo(PurePageHeader);