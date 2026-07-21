'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const amountOptions = [25, 50, 100, 250, 500, 1000];

const impactByAmount: Record<number, string> = {
  25: 'provides digital tools for one student for a week.',
  50: 'funds one week of internet access for a community hub.',
  100: 'trains one teacher in digital pedagogy.',
  250: 'sponsors a student through Digital Literacy.',
  500: 'equips a classroom with hardware for one program.',
  1000: 'funds an entire program cohort for one community.',
};

const projectOptions = [
  'Where it is needed most',
  'Community Digital Literacy Programme',
  'School Digital Education Programme',
  'Community Technology Access Programme',
];

const donationSchema = z.object({
  frequency: z.enum(['one-time', 'monthly']),
  amount: z.number().positive('Enter a donation amount greater than zero.'),
  customAmount: z.string(),
  project: z.string().min(1),
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  cardNumber: z
    .string()
    .refine(
      (value) => value.replace(/\s/g, '').length >= 12,
      'Enter a valid card number.',
    ),
});

type DonationValues = z.infer<typeof donationSchema>;

function getImpact(amount: number) {
  const exactImpact = impactByAmount[amount];
  if (exactImpact) return exactImpact;
  if (amount >= 1000) return impactByAmount[1000];
  if (amount >= 500) return impactByAmount[500];
  if (amount >= 250) return impactByAmount[250];
  if (amount >= 100) return impactByAmount[100];
  if (amount >= 50) return impactByAmount[50];
  if (amount >= 25) return impactByAmount[25];
  return 'helps expand practical digital learning in rural communities.';
}

function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export default function DonationSelector() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const form = useForm<DonationValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      frequency: 'one-time',
      amount: 100,
      customAmount: '',
      project: projectOptions[0],
      fullName: '',
      email: '',
      cardNumber: '',
    },
  });

  const frequency = form.watch('frequency');
  const amount = form.watch('amount');
  const customAmount = form.watch('customAmount');

  const chooseAmount = (nextAmount: number) => {
    form.setValue('amount', nextAmount, { shouldDirty: true, shouldValidate: true });
    form.setValue('customAmount', '', { shouldDirty: true });
  };

  const openPaymentForm = async () => {
    const selectionIsValid = await form.trigger([
      'frequency',
      'amount',
      'project',
    ]);

    if (selectionIsValid) setShowPaymentForm(true);
  };

  const submitDonation = () => {
    toast.info('Payment processing is not connected yet.', {
      description:
        'Your details have not been sent. A secure payment provider will be added before donations go live.',
    });
  };

  return (
    <div className="rounded-3xl border border-black/[0.08] bg-[#f8fafb] p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#141d20] sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitDonation)}>
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Donation frequency</FormLabel>
                <FormControl>
                  <div className="flex gap-3" aria-label="Donation frequency">
                    {(['one-time', 'monthly'] as const).map((option) => {
                      const isActive = frequency === option;

                      return (
                        <Button
                          key={option}
                          type="button"
                          variant={isActive ? 'default' : 'outline'}
                          aria-pressed={isActive}
                          onClick={() => field.onChange(option)}
                          className={cn(
                            'h-[42px] rounded-2xl px-5 text-sm font-semibold capitalize shadow-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#04af9f]/40',
                            isActive
                              ? 'border border-[#04af9f] bg-[#04af9f] text-white hover:bg-[#039b8d] hover:text-white hover:shadow-[0_8px_20px_rgba(4,175,159,0.18)]'
                              : 'border-black/[0.08] bg-transparent text-[#6b7280] hover:border-[#04af9f]/35 hover:bg-transparent hover:text-[#04af9f] dark:border-white/10 dark:text-white/60 dark:hover:border-[#04af9f]/45 dark:hover:bg-transparent dark:hover:text-[#04af9f]',
                          )}
                        >
                          {option === 'one-time' ? 'One-Time' : 'Monthly'}
                        </Button>
                      );
                    })}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={() => (
              <FormItem className="mt-8">
                <FormLabel className="sr-only">Choose an amount</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Choose an amount">
                    {amountOptions.map((option) => {
                      const isActive = customAmount === '' && amount === option;

                      return (
                        <Button
                          key={option}
                          type="button"
                          variant={isActive ? 'default' : 'outline'}
                          aria-pressed={isActive}
                          onClick={() => chooseAmount(option)}
                          className={cn(
                            'h-[46px] rounded-2xl px-1 text-sm font-bold shadow-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#04af9f]/40',
                            isActive
                              ? 'border border-[#04af9f] bg-[#04af9f] text-white hover:bg-[#039b8d] hover:text-white hover:shadow-[0_8px_20px_rgba(4,175,159,0.16)]'
                              : 'border-black/[0.08] bg-transparent text-[#0d1117] hover:-translate-y-0.5 hover:border-[#04af9f]/35 hover:bg-transparent dark:border-white/10 dark:text-white dark:hover:border-[#04af9f]/45 dark:hover:bg-transparent',
                          )}
                        >
                          ${formatAmount(option)}
                        </Button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage className="px-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customAmount"
            render={({ field }) => (
              <FormItem className="relative mt-4 space-y-0">
                <FormLabel className="sr-only">Custom donation amount</FormLabel>
                <span className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-base font-semibold text-[#6b7280] dark:text-white/50">
                  $
                </span>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="decimal"
                    placeholder="Custom amount"
                    {...field}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      const parsedAmount = Number(nextValue);

                      field.onChange(nextValue);
                      form.setValue(
                        'amount',
                        Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0,
                        { shouldDirty: true, shouldValidate: true },
                      );
                    }}
                    className="h-[50px] rounded-2xl border-black/[0.08] bg-[#f3f6f5] pl-8 pr-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 placeholder:text-[#6b7280] hover:border-[#04af9f]/35 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/40"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-6 flex items-start gap-3 rounded-2xl border-l-[3px] border-[#04af9f] bg-[#04af9f]/[0.07] px-4 py-4 text-sm leading-5 text-[#0d1117] dark:bg-[#04af9f]/10 dark:text-white">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#04af9f]" />
            <p>
              <strong>${formatAmount(amount)}</strong> {getImpact(amount)}
            </p>
          </div>

          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="text-xs font-semibold leading-4 text-[#6b7280] dark:text-white/60">
                  Direct to project (optional)
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-[50px] rounded-2xl border-black/[0.08] bg-[#f3f6f5] px-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 hover:border-[#04af9f]/35 focus:ring-2 focus:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white">
                      <SelectValue placeholder="Choose a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl border-black/[0.08] dark:border-white/10">
                    {projectOptions.map((option) => (
                      <SelectItem key={option} value={option} className="rounded-xl py-2.5">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showPaymentForm ? (
            <div
              id="donation-details"
              className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Full name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="name"
                          placeholder="Full name"
                          {...field}
                          className="h-[50px] rounded-2xl border-black/[0.08] bg-[#f3f6f5] px-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 placeholder:text-[#6b7280] hover:border-[#04af9f]/35 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="Email"
                          {...field}
                          className="h-[50px] rounded-2xl border-black/[0.08] bg-[#f3f6f5] px-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 placeholder:text-[#6b7280] hover:border-[#04af9f]/35 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel className="sr-only">Card number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="Card number"
                          maxLength={19}
                          {...field}
                          onChange={(event) => {
                            const digits = event.target.value
                              .replace(/\D/g, '')
                              .slice(0, 16);

                            field.onChange(
                              digits.replace(/(\d{4})(?=\d)/g, '$1 '),
                            );
                          }}
                          className="h-[50px] rounded-2xl border-black/[0.08] bg-[#f3f6f5] px-4 text-sm text-[#0d1117] shadow-none transition-all duration-300 placeholder:text-[#6b7280] hover:border-[#04af9f]/35 focus-visible:border-[#04af9f] focus-visible:ring-2 focus-visible:ring-[#04af9f]/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={amount <= 0}
                className="mt-6 h-14 w-full rounded-2xl bg-[#04af9f] text-base font-bold text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#039b8d] hover:text-white hover:shadow-[0_14px_30px_rgba(4,175,159,0.24)] focus-visible:ring-2 focus-visible:ring-[#04af9f]/40"
              >
                Donate ${formatAmount(amount)}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              disabled={amount <= 0}
              onClick={openPaymentForm}
              className="mt-6 h-14 w-full rounded-2xl bg-[#04af9f] text-base font-bold text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#039b8d] hover:text-white hover:shadow-[0_14px_30px_rgba(4,175,159,0.24)] focus-visible:ring-2 focus-visible:ring-[#04af9f]/40"
            >
              Continue, ${formatAmount(amount)}
            </Button>
          )}

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs leading-4 text-[#6b7280] dark:text-white/50">
            <ShieldCheck aria-hidden="true" className="size-3" />
            Secure, encrypted · Tax-deductible in eligible countries
          </p>
        </form>
      </Form>
    </div>
  );
}
