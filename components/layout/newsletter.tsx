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
import { ArrowRight, Mail } from 'lucide-react';

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
    <section className="bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-10" id="newsletter">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-[#102f2a] p-6 text-white shadow-xl sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-secondary">
          <Mail className="h-5 w-5" />
        </div>
        <h2 className="mt-5 max-w-xl text-3xl font-bold sm:text-4xl">
          Follow the field work.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
          Receive notes from the communities, cohorts, and partners helping Whiz Academy
          expand digital access from the ground up.
        </p>
      </div>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="h-12 w-full rounded-md border-white/20 bg-white text-foreground placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-12 rounded-md bg-secondary px-5 font-semibold text-secondary-foreground hover:bg-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Subscribe'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </Form>
        <p className="mt-3 text-xs leading-5 text-white/60">
          Occasional updates only, focused on program progress and ways to support the work.
        </p>
      </div>
      </div>
    </section>
  );
}
