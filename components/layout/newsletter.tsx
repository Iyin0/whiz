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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email(),
});

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        toast.success('You have been subscribed to our newsletter!');
        form.reset();
      } else {
        throw new Error('Failed to subscribe. Please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row  items-center justify-center gap-10 sm:gap-20 px-4 py-10 sm:py-24 sm:px-[160px]">
      <h2 className="text-3xl text-center sm:text-left sm:text-5xl font-medium max-w-[481px]">Stay updated with our newsletter</h2>
      <div className="flex flex-col grow max-w-[549px]">
        <p className="text-sm">Get the latest updates and news from Whiz Academy.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 mb-6 flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="rounded-md w-full h-12"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" className="bg-white text-black/50 border border-black/50"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Subscribe'}
            </Button>
          </form>
        </Form>
        <p className="text-sm">By clicking Sign Up, you agree to our Terms and Conditions.</p>
      </div>
    </div>
  );
}