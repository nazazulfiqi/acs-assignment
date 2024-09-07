'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { z } from 'zod';

import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { updatePassword } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/redux/store';
import { changePasswordSchema } from '@/validations/change-password-schema';

const ChangePasswordModule = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user?.id;

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      const resultAction = await dispatch(
        updatePassword({
          id: id!,
          currentPassword: values.password,
          newPassword: values.newPassword,
        }),
      );

      if (updatePassword.fulfilled.match(resultAction)) {
        toast.success('Password changed successfully!');
        router.push('/change-password');
      } else {
        toast.error(resultAction.payload as string);
      }
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <MainLayout>
      <section className='mx-auto min-h-[80vh] max-w-7xl px-4 py-8'>
        <div className='mb-4 space-y-4'>
          <h1 className='text-2xl font-semibold'>Change Password</h1>
          <Separator />
        </div>

        <div className='mt-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 gap-6'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Current Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='New Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-tertiary text-white hover:bg-tertiary-foreground'
              >
                Change Password
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ChangePasswordModule;
