'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Enter a valid email address.'),
  phone: z.string(),
  subject: z.string().min(1, 'Choose a subject.'),
  message: z.string().min(10, 'Please tell us a little more.'),
});

type ContactValues = z.infer<typeof formSchema>;

const fieldClassName = 'h-12 rounded-xl border-[#d9dfe2] bg-[#f2f5f4] px-4 text-sm shadow-none placeholder:text-[#8a929c] focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white';

interface ContactFormProps { initialSubject?: string; initialMessage?: string }

export default function ContactForm({ initialSubject = '', initialMessage = '' }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', subject: initialSubject, message: initialMessage },
  });

  async function onSubmit(values: ContactValues) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send your message. Please try again.');
      }
      toast.success('Your message has been sent.');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send your message.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-[28px] border border-[#dfe4e8] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20] sm:p-8">
        <h2 className="font-jakarta text-2xl font-extrabold">Send a message</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="firstName" render={({ field }) => <FormItem><FormLabel>First name *</FormLabel><FormControl><Input autoComplete="given-name" placeholder="Amara" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="lastName" render={({ field }) => <FormItem><FormLabel>Last name *</FormLabel><FormControl><Input autoComplete="family-name" placeholder="Okafor" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        </div>
        <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="you@example.com" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input type="tel" autoComplete="tel" placeholder="+234 800 000 0000" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="subject" render={({ field }) => <FormItem><FormLabel>I&apos;m writing about *</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger className={fieldClassName}><SelectValue /></SelectTrigger></FormControl><SelectContent>{['Volunteering', 'Partnerships', 'Donating equipment', 'Bringing our programs to my community', 'Programme information', 'General enquiry'].map((subject) => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
        <FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel>Message *</FormLabel><FormControl><Textarea placeholder="Tell us more about your enquiry..." {...field} className="min-h-[145px] resize-none rounded-xl border-[#d9dfe2] bg-[#f2f5f4] p-4 text-sm shadow-none placeholder:text-[#8a929c] focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white" /></FormControl><FormMessage /></FormItem>} />
        <Button type="submit" disabled={isLoading} className="h-14 w-full rounded-xl bg-[#04af9f] text-sm font-bold text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579]">
          {isLoading ? 'Sending...' : 'Send Message'}{!isLoading ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
        </Button>
        <p className="text-center text-xs text-[#6b7280] dark:text-white/45">We typically respond within 24–48 hours on business days.</p>
      </form>
    </Form>
  );
}
