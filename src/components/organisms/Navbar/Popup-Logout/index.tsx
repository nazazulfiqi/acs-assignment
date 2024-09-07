import { signOut } from 'next-auth/react';
import { IoWarningOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ModalLogoutProps {
  modalTrigger: React.ReactNode;
}

export const ModalLogout = ({ modalTrigger }: ModalLogoutProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className='p-12 text-center sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center justify-center'>
            <div className='rounded-full bg-red-200 p-3'>
              <IoWarningOutline className='text-red-800' size={24} />
            </div>
          </div>
          <DialogTitle>
            <h6 className='text-center'>Confirm Sign Out</h6>
          </DialogTitle>

          <DialogDescription className='text-center'>
            Are you sure you want to sign out? Any unsaved changes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex w-full justify-between gap-2 md:gap-0'>
          <DialogClose asChild>
            <Button variant='outline' className='w-full'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose className='w-full'>
            <Button
              type='submit'
              className='w-full bg-red-800 text-white hover:bg-red-900'
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
