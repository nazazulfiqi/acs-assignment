import { Loader2 } from 'lucide-react';
import React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

type ButtonLoadingProps = ButtonProps & {
  // Tambahkan properti khusus untuk ButtonLoading di sini jika diperlukan
};

export default function ButtonLoading(props: ButtonLoadingProps) {
  return (
    <Button
      disabled
      type='button'
      className={` ${props.className || ''}`}
    >
      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      Please wait
    </Button>
  );
}
