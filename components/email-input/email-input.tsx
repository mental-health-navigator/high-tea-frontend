// Logic Component

'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '@/components/toast';

import { login, type LoginActionState } from '../../app/(auth)/actions';
import { useSession } from 'next-auth/react';
import { EmailInputUI } from './email-input-ui';

export function EmailInput() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login, // TODO: change to request magic link action
    {
      status: 'idle',
    },
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: 'Invalid credentials!',
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <EmailInputUI
      onSubmit={handleSubmit}
      isSuccessful={isSuccessful}
      isError={state.status === 'failed' || state.status === 'invalid_data'}
      errorMessage={
        state.status === 'failed'
          ? 'Invalid credentials!'
          : state.status === 'invalid_data'
            ? 'Failed validating your submission!'
            : undefined
      }
    />
  );
}
