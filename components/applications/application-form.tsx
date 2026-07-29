'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
import { Loader2, Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export type ApplicationPosting = {
  id: string;
  title: string;
  type: string;
  requiresCv?: boolean;
};

type ApplicationFormProps = {
  postings: ApplicationPosting[];
  deadline: string;
  expiresAt?: string;
  endpoint?: string;
  defaultPostingId?: string;
};

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const minStatementWords = 50;
const maxStatementWords = 300;
const inputClassName =
  'h-12 rounded-xl border-black/[0.08] bg-white px-4 shadow-none transition-colors focus-visible:border-[#04af9f] focus-visible:ring-[#04af9f]/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/30';
const textareaClassName =
  'rounded-xl border-black/[0.08] bg-white px-4 py-3 shadow-none transition-colors focus-visible:border-[#04af9f] focus-visible:ring-[#04af9f]/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/30';

function buildApplicationSchema(postings: ApplicationPosting[]) {
  const cvRequiredPostingIds = postings
    .filter((posting) => posting.requiresCv)
    .map((posting) => posting.id);

  return z.object({
    roleId: z.string().min(1, { message: 'Choose a role' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }).refine((value) => {
      const phoneNumber = parsePhoneNumberFromString(value);

      if (!phoneNumber) {
        return false;
      }

      return isValidPhoneNumber(phoneNumber.number);
    }, {
      message: 'Include a valid phone number with country code',
    }),
    location: z.string().min(2, { message: 'Location is required' }),
    availability: z.string().min(1, { message: 'Choose your availability' }),
    weeklyHours: z.string().min(1, { message: 'Choose your weekly availability' }),
    experience: z.string().min(20, { message: 'Share a short summary of your relevant experience' }),
    statement: z.string().refine((value) => {
      const words = wordCount(value);

      return words >= minStatementWords && words <= maxStatementWords;
    }, {
      message: `Statement must be between ${minStatementWords} and ${maxStatementWords} words`,
    }),
    cvUrl: z.string().url({ message: 'Enter a valid CV or resume link' }).optional().or(z.literal('')),
    portfolioUrl: z.string().url({ message: 'Enter a valid portfolio link' }).optional().or(z.literal('')),
    safeguardingAgreement: z.boolean().refine(Boolean, {
      message: 'Confirm the safeguarding commitment',
    }),
    consent: z.boolean().refine(Boolean, {
      message: 'Confirm consent before submitting',
    }),
  }).superRefine((values, context) => {
    if (cvRequiredPostingIds.includes(values.roleId) && !values.cvUrl) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A CV or resume link is required for paid roles',
        path: ['cvUrl'],
      });
    }
  });
}

type ApplicationFormValues = z.infer<ReturnType<typeof buildApplicationSchema>>;

export default function ApplicationForm({
  postings,
  deadline,
  expiresAt,
  endpoint = '/api/applications',
  defaultPostingId,
}: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedWindow, setHasCheckedWindow] = useState(!expiresAt);
  const [isExpired, setIsExpired] = useState(false);
  const schema = useMemo(() => buildApplicationSchema(postings), [postings]);
  const defaultRoleId = defaultPostingId ?? postings[0]?.id ?? '';

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleId: defaultRoleId,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      availability: '',
      weeklyHours: '',
      experience: '',
      statement: '',
      cvUrl: '',
      portfolioUrl: '',
      safeguardingAgreement: false,
      consent: false,
    },
  });

  const selectedPosting = postings.find((posting) => posting.id === form.watch('roleId'));
  const statementWords = wordCount(form.watch('statement') ?? '');

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const expiresAtTime = new Date(expiresAt).getTime();

    function updateApplicationWindow() {
      setIsExpired(Date.now() > expiresAtTime);
      setHasCheckedWindow(true);
    }

    updateApplicationWindow();
    const interval = window.setInterval(updateApplicationWindow, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [expiresAt]);

  async function onSubmit(values: ApplicationFormValues) {
    try {
      setIsLoading(true);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to submit application. Please try again.');
      }

      toast.success('Your application has been submitted.');
      form.reset({
        roleId: defaultRoleId,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        availability: '',
        weeklyHours: '',
        experience: '',
        statement: '',
        cvUrl: '',
        portfolioUrl: '',
        safeguardingAgreement: false,
        consent: false,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit application.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!hasCheckedWindow) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-5 text-sm text-[#6b7280] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">
        Checking application window...
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <h3 className="font-jakarta text-lg font-extrabold">Applications are closed</h3>
        <p className="mt-2 text-sm leading-6 text-[#6b7280] dark:text-white/60">
          The application deadline for this cycle was {deadline}. Please check back for future opportunities.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputClassName}>
                      <SelectValue placeholder="Choose a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {postings.map((posting) => (
                      <SelectItem key={posting.id} value={posting.id}>
                        {posting.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPosting ? (
                  <p className="text-xs text-muted-foreground">{selectedPosting.type}</p>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputClassName}>
                      <SelectValue placeholder="Choose availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekday-evenings">Weekday evenings</SelectItem>
                    <SelectItem value="saturdays">Saturdays</SelectItem>
                    <SelectItem value="bootcamps-holidays">Bootcamps and holidays</SelectItem>
                    <SelectItem value="remote-support">Remote support</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input className={inputClassName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input className={inputClassName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className={inputClassName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input className={inputClassName} placeholder="+234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current location</FormLabel>
                <FormControl>
                  <Input className={inputClassName} placeholder="City, state, country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weeklyHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weekly hours</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputClassName}>
                      <SelectValue placeholder="Choose hours" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4-10">4-10 hours</SelectItem>
                    <SelectItem value="10-20">10-20 hours</SelectItem>
                    <SelectItem value="20-plus">20+ hours</SelectItem>
                    <SelectItem value="programme-specific">Programme-specific</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relevant experience</FormLabel>
              <FormControl>
                <Textarea
                  className={`min-h-28 ${textareaClassName}`}
                  placeholder="Teaching, facilitation, technology, youth work, media, administration, or community experience"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormLabel>Statement</FormLabel>
                <span className="text-xs text-muted-foreground">{statementWords}/{maxStatementWords} words</span>
              </div>
              <FormControl>
                <Textarea
                  className={`min-h-40 ${textareaClassName}`}
                  placeholder="Tell us why you would like to join Whiz Academy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="cvUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV or resume link</FormLabel>
                <FormControl>
                  <Input className={inputClassName} placeholder="https://..." {...field} />
                </FormControl>
                <p className="text-xs text-muted-foreground">Required for paid roles. Use a shareable Google Drive, Dropbox, or portfolio link.</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio or work sample link</FormLabel>
                <FormControl>
                  <Input className={inputClassName} placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 rounded-2xl border border-black/[0.08] bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <FormField
            control={form.control}
            name="safeguardingAgreement"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div>
                  <FormLabel className="font-normal leading-6">
                    I understand that Whiz Academy works with children and young people and that successful applicants must uphold safeguarding and child protection policies.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div>
                  <FormLabel className="font-normal leading-6">
                    I consent to Whiz Academy contacting me about this application before the {deadline} deadline and during the selection process.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#04af9f] px-6 text-sm font-bold text-white shadow-none hover:bg-[#039b8d] active:bg-[#028579] sm:w-fit"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isLoading ? 'Submitting...' : 'Submit application'}
        </Button>
      </form>
    </Form>
  );
}
