'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  orgName: z.string().min(1, {
    message: 'Organization name is required',
  }),
  phone: z.string().min(1, {
    message: 'Phone number is required',
  }).refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return false;
    return isValidPhoneNumber(phoneNumber.number);
  }, {
    message: 'Invalid phone number. Country code is required.',
  }),
});

export default function SponsorshipForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      orgName: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/sponsor', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        toast.success('Your sponsorship request has been sent!');
        form.reset();
      } else {
        throw new Error('Failed to send sponsorship request. Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col px-4 pb-4 sm:px-20 gap-8" id="sponsorship">
      <p>Kindly fill the form below and we will reach out to you</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[600px]">
          <div className="flex gap-4 w-fit">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="First Name" {...field} className="rounded-md w-full h-12 max-w-[200px]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Last Name" {...field} className="rounded-md w-full h-12 max-w-[200px]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="orgName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Organization Name" {...field} className="rounded-md w-full h-12 max-w-[280px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Email Address" {...field} className="rounded-md w-full h-12 max-w-[250px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Phone Number" {...field} className="rounded-md w-full h-12 max-w-[280px]"/>
                </FormControl>
                <FormLabel className="text-xs text-gray-500">Include the country code (e.g. +23458765673687)</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            variant="outline" 
            className="bg-white text-black/80 border border-black/50 w-fit py-3 px-5"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Sponsor'}
          </Button>
        </form>
      </Form>
    </div>
  );
}