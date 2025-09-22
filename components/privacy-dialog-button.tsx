import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type PrivacyDialogButtonProps = {
  className?: string;
};
export function PrivacyDialogButton({ className }: PrivacyDialogButtonProps) {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <Dialog open={isPrivacyModalOpen} onOpenChange={setIsPrivacyModalOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className={className}>
          Privacy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Your Privacy Matters
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="font-medium">
            <strong>
              We don&apos;t store your conversations or personal data.
            </strong>
          </p>

          <p className="text-sm text-muted-foreground">
            Your chats are processed in real-time and aren&apos;t saved to our
            servers. When you close your browser or end your session, your
            conversation history is gone.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">What this means:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
              <li>No chat logs or personal information stored</li>
              <li>No conversation history accessible to us</li>
              <li>Your data stays private and secure</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            We&apos;re committed to protecting your privacy while providing you
            with the best AI experience.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
