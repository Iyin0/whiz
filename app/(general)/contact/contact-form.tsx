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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';

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
  message: z.string().min(1, {
    message: 'Message is required',
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

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        toast.success('Your message has been sent!');
        form.reset();
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-10" id="contact">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-accent">General inquiry</p>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Have another question?</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Send a message and the Whiz Academy team will follow up with the right information
          for your community, institution, or support idea.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-4 rounded-lg border bg-background p-5 shadow-sm sm:p-6">
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
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea placeholder="Message" {...field} className="min-h-[180px] rounded-md bg-white resize-none"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit"
            className="h-11 w-fit rounded-md bg-primary px-5 text-white hover:bg-primary/90"
            disabled={isLoading}
          >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>
      </Form>
      </div>
    </section>
  );
}
