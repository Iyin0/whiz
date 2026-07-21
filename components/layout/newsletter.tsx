'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

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

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to subscribe. Please try again.');
      }

      toast.success('You have been subscribed to our newsletter!');
      form.reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-[rgba(241,245,244,0.4)] py-16 transition-colors duration-300 dark:bg-[#0a1716] sm:py-20" id="newsletter">
      <Reveal className="mx-auto max-w-[768px] px-6 text-center">
        <h2 className="font-jakarta text-3xl font-extrabold leading-tight tracking-[-0.75px] text-[#0d1117] transition-colors duration-300 dark:text-white sm:text-4xl sm:leading-10 sm:tracking-[-0.9px]">
          Get impact stories in your inbox
        </h2>
        <p className="mt-4 text-base leading-6 text-[#6b7280] transition-colors duration-300 dark:text-white/60">
          Program updates, success stories, events, and opportunities to support the movement.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-8 flex w-full max-w-[448px] flex-col gap-3 sm:flex-row"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 text-left">
                  <FormControl>
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      aria-label="Email address"
                      {...field}
                      className="h-12 rounded-2xl border-black/[0.08] bg-[#f8fafb] px-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 placeholder:text-[#6b7280] hover:border-[#04af9f]/35 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/40 dark:hover:border-[#04af9f]/45"
                    />
                  </FormControl>
                  <FormMessage className="px-1 text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-12 rounded-2xl bg-[#04af9f] px-6 text-base font-semibold text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#039b8d] hover:text-white hover:shadow-[0_12px_28px_rgba(4,175,159,0.22)] focus-visible:ring-2 focus-visible:ring-[#04af9f]/40 disabled:pointer-events-none disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </form>
        </Form>
      </Reveal>
    </section>
  );
}
