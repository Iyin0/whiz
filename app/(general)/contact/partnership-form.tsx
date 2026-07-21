'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const partnershipTypes = [
  'Strategic Partnerships',
  'Programme Sponsorship',
  'Technology Partnerships',
  'Community Partnerships',
  'Knowledge & Volunteer',
  'Funding & Grants',
];

const formSchema = z.object({
  contactName: z.string().min(2, 'Contact name is required.'),
  jobTitle: z.string(),
  orgName: z.string(),
  email: z.string().email('Enter a valid email address.'),
  phone: z.string().min(1, 'Phone number is required.'),
  partnershipTypes: z.array(z.string()).min(1, 'Choose at least one partnership type.'),
  website: z.string().url('Enter a valid website URL.').or(z.literal('')),
  message: z.string().min(10, 'Tell us a little more about your goals.'),
});

type PartnershipValues = z.infer<typeof formSchema>;

const fieldClassName = 'h-12 rounded-xl border-[#d9dfe2] bg-[#f2f5f4] px-4 text-sm shadow-none placeholder:text-[#8a929c] focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white';

export default function PartnershipForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PartnershipValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { contactName: '', jobTitle: '', orgName: '', email: '', phone: '', partnershipTypes: [], website: '', message: '' },
  });

  async function onSubmit(values: PartnershipValues) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/partner', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send partnership request. Please try again.');
      }
      toast.success('Your partnership inquiry has been sent.');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit your inquiry.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-[28px] border border-[#dfe4e8] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20] sm:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="contactName" render={({ field }) => <FormItem><FormLabel>Contact name *</FormLabel><FormControl><Input autoComplete="name" placeholder="Emeka Adeyemi" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="jobTitle" render={({ field }) => <FormItem><FormLabel>Job title</FormLabel><FormControl><Input autoComplete="organization-title" placeholder="Head of CSR" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        </div>
        <FormField control={form.control} name="orgName" render={({ field }) => <FormItem><FormLabel>Organisation name</FormLabel><FormControl><Input autoComplete="organization" placeholder="Your organisation" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="you@organisation.com" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone number *</FormLabel><FormControl><Input type="tel" autoComplete="tel" placeholder="+234 800 000 0000" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        </div>
        <FormField
          control={form.control}
          name="partnershipTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partnership type *</FormLabel>
              <div className="grid gap-2 sm:grid-cols-2">
                {partnershipTypes.map((type) => (
                  <label key={type} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-xl border border-[#dfe4e8] bg-transparent px-4 py-2 text-xs font-medium transition-colors hover:border-[#04af9f]/50 hover:bg-[#04af9f]/[0.04] has-[[data-state=checked]]:border-[#04af9f] has-[[data-state=checked]]:bg-[#04af9f]/[0.08] dark:border-white/10">
                    <Checkbox checked={field.value.includes(type)} onCheckedChange={(checked) => field.onChange(checked ? [...field.value, type] : field.value.filter((value) => value !== type))} />
                    {type}
                  </label>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="website" render={({ field }) => <FormItem><FormLabel>Website</FormLabel><FormControl><Input type="url" autoComplete="url" placeholder="https://yourorganisation.com" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel>Tell us about your goals *</FormLabel><FormControl><Textarea placeholder="What are you hoping to achieve through this partnership? What resources can your organisation bring?" {...field} className="min-h-[130px] resize-none rounded-xl border-[#d9dfe2] bg-[#f2f5f4] p-4 text-sm shadow-none placeholder:text-[#8a929c] focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white" /></FormControl><FormMessage /></FormItem>} />
        <Button type="submit" disabled={isLoading} className="h-14 w-full rounded-xl bg-[#04af9f] text-sm font-bold text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579]">
          {isLoading ? 'Submitting...' : 'Submit Partnership Inquiry'}
          {!isLoading ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
        </Button>
        <p className="text-center text-xs text-[#6b7280] dark:text-white/45">We respond to all inquiries within 48 hours on business days.</p>
      </form>
    </Form>
  );
}
