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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
  donation: z.array(z.string()).min(1, {
    message: 'Please select at least one donation option',
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

export default function DonationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      donation: [],
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/donate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        toast.success('Your donation request has been sent!');
        form.reset();
      } else {
        throw new Error('Failed to send donation request. Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const donationOptions = ['Money', 'Items', 'Others'];

  return (
    <div className="flex flex-col gap-6 pb-6">
      <p className="text-sm text-muted-foreground">Share your details and we will follow up on the best way to receive and steward your donation.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-3xl gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="First Name" {...field} className="h-12 rounded-md bg-white"/>
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
                    <Input placeholder="Last Name" {...field} className="h-12 rounded-md bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="donation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    {donationOptions.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <Checkbox 
                          id={option} 
                          checked={field.value.includes(option)} 
                          onCheckedChange={() => {
                            field.onChange(field.value.includes(option)
                              ? field.value.filter((value: string) => value !== option) 
                              : [...field.value, option]);
                          }}
                        />
                        <Label htmlFor={option} className="text-muted-foreground">{option}</Label>
                      </div>
                    ))}
                  </div>
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
                  <Input placeholder="Email Address" {...field} className="h-12 rounded-md bg-white"/>
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
                  <Input placeholder="Phone Number" {...field} className="h-12 rounded-md bg-white"/>
                </FormControl>
                <FormLabel className="text-xs text-muted-foreground">Include the country code (e.g. +447587873007)</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            variant="outline" 
            className="h-11 w-fit rounded-md bg-primary px-5 text-white hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Donate'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
