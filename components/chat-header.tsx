'use client';

import { useRouter } from 'next/navigation';

import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { type VisibilityType } from './visibility-selector';
import type { Session } from 'next-auth';
import Image from 'next/image';
import { Button } from './ui/button';
import { SidebarToggle } from './sidebar-toggle';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  return (
    <header className="flex sticky top-0 py-1.5 items-center px-2 gap-2 justify-between m-3">
      <div className="md:hidden">
        <SidebarToggle />
      </div>
      <div className="hidden md:contents">
        <Image src="/images/logo.png" alt="Logo" width={132} height={32} />
        <div className="flex gap-12">
          <Button variant={'default'}>Search</Button>
          <Button variant={'ghost'}>Help</Button>
          <Button variant={'ghost'}>About</Button>
        </div>
      </div>
      <Button variant={'secondary'}>Quick Close</Button>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
