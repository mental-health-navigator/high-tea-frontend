import { LoaderIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ArrowUpIcon } from '../icons';

export function EmailSubmitButton({
  isSuccessful,
  isLoading,
}: {
  isSuccessful: boolean;
  isLoading: boolean;
}) {
  return (
    <Button
      data-testid="send-button"
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600 absolute right-1 top-1/2 -translate-y-1/2"
      disabled={isLoading || isSuccessful}
    >
      {isLoading ? (
        <LoaderIcon size={16} className="animate-spin" />
      ) : (
        <ArrowUpIcon size={16} />
      )}
    </Button>
  );
}
