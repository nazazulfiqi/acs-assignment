import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AuthLayout from '@/components/layouts/AuthLayout';
import ButtonLoading from '@/components/organisms/LoadingButton';
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

import { formSignInSchema } from '@/validations/auth-schema';


const SignInModule = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSignInSchema>) => {
    console.log(values)
    setLoading(true);

    
  };


  return (
    <AuthLayout>
      <div className='mb-4 space-y-1'>
        <h1 className='text-3xl font-semibold'>Masuk</h1>
        <p className='text-sm text-slate-400'>
          Silahkan masuk menggunakan email dan kata sandi yang terdaftar
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loading ? (
            <ButtonLoading className='w-full'/>
          ) : (
            <Button
              type='submit'
              className='bg-primary-500 hover:bg-primary-600 w-full '
    
            >
              Sign In
            </Button>
          )}
        </form>
      </Form>
    </AuthLayout>
  )
}

export default SignInModule