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
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Enter a valid email address.'),
  linkedIn: z.string().url('Enter a valid LinkedIn URL.').or(z.literal('')),
  role: z.string().min(1, 'Choose a volunteer role.'),
  availability: z.string().min(1, 'Tell us when you are available.'),
  experience: z.string().min(20, 'Please share a little more about your skills.'),
});

type VolunteerValues = z.infer<typeof formSchema>;
const fieldClassName = 'h-12 rounded-2xl border-black/[0.08] bg-[#f3f6f5] px-4 text-sm shadow-none placeholder:text-[#6b7280]/70 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white';

export default function VolunteerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<VolunteerValues>({ resolver: zodResolver(formSchema), defaultValues: { fullName: '', email: '', linkedIn: '', role: '', availability: '', experience: '' } });

  async function onSubmit(values: VolunteerValues) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/volunteer', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send volunteer request. Please try again.');
      }
      toast.success('Your volunteer application has been sent.');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit your application.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-6 dark:border-white/10 dark:bg-[#141d20] sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="fullName" render={({ field }) => <FormItem><FormLabel className="sr-only">Full name</FormLabel><FormControl><Input autoComplete="name" placeholder="Full name" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel className="sr-only">Email address</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="Email address" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        </div>
        <FormField control={form.control} name="linkedIn" render={({ field }) => <FormItem><FormLabel className="sr-only">LinkedIn profile URL (optional)</FormLabel><FormControl><Input type="url" autoComplete="url" placeholder="LinkedIn profile URL (optional)" {...field} className={fieldClassName} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel className="sr-only">Volunteer role</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger className={fieldClassName} aria-label="Volunteer role"><SelectValue placeholder="Select a volunteer role" /></SelectTrigger></FormControl><SelectContent>{['Program Instructor', 'Curriculum Developer', 'Mentor', 'Community Outreach', 'Technical Support', 'Fundraising & Partnerships'].map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
        <FormField control={form.control} name="availability" render={({ field }) => <FormItem><FormLabel className="sr-only">Availability</FormLabel><Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger className={fieldClassName} aria-label="Availability"><SelectValue placeholder="Select your availability" /></SelectTrigger></FormControl><SelectContent>{['2–4 hours per week', '5–10 hours per week', 'Weekends', 'Project-based', 'Full programme cohort'].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
        <FormField control={form.control} name="experience" render={({ field }) => <FormItem><FormLabel className="sr-only">Skills and motivation</FormLabel><FormControl><Textarea placeholder="Tell us about your skills and why you want to volunteer with Whiz Academy..." {...field} className="min-h-[115px] resize-none rounded-2xl border-black/[0.08] bg-[#f3f6f5] p-4 text-sm shadow-none placeholder:text-[#6b7280]/70 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white" /></FormControl><FormMessage /></FormItem>} />
        <Button type="submit" disabled={isLoading} className="h-13 w-full rounded-xl bg-[#04af9f] text-sm font-bold text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579]">
          {isLoading ? 'Submitting...' : 'Submit Application'}{!isLoading ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
        </Button>
      </form>
    </Form>
  );
}
