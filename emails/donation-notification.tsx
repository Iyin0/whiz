import * as React from 'react';
import {
  DetailCard,
  DetailRow,
  NotificationLayout,
} from './components/notification-layout';
import { Text } from '@react-email/components';

export interface DonationNotificationEmailProps {
  donorName: string;
  donorEmail: string;
  baseAmount: string;
  processingFee: string;
  totalAmount: string;
  frequency: string;
  project: string;
  reference: string;
  paidAt: string;
  channel: string;
  environment: string;
  requiresReview: boolean;
}

export default function DonationNotificationEmail({
  donorName,
  donorEmail,
  baseAmount,
  processingFee,
  totalAmount,
  frequency,
  project,
  reference,
  paidAt,
  channel,
  environment,
  requiresReview,
}: DonationNotificationEmailProps) {
  const accentColor = requiresReview ? '#b42318' : '#04af9f';

  return (
    <NotificationLayout
      preview={`${requiresReview ? 'Review required' : 'Donation confirmed'}: ${totalAmount} from ${donorName}`}
      status={requiresReview ? 'Payment needs review' : 'Payment confirmed'}
      title={
        requiresReview
          ? 'Successful Paystack payment requires review'
          : 'New successful donation'
      }
      description="Paystack confirmed a successful donation through the Whiz Academy website."
      accentColor={accentColor}
    >
      <DetailCard accentColor={accentColor}>
        <DetailRow label="Base donation" value={baseAmount} />
        <DetailRow
          label="Paystack processing fee"
          value={processingFee}
        />
        <DetailRow label="Total charged" value={totalAmount} />
        <DetailRow label="Donor" value={donorName} />
        <DetailRow label="Email" value={donorEmail} />
        <DetailRow label="Frequency" value={frequency} />
        <DetailRow label="Directed project" value={project} />
        <DetailRow label="Payment channel" value={channel} />
        <DetailRow label="Paid at" value={paidAt} />
        <DetailRow label="Reference" value={reference} />
        <DetailRow label="Paystack environment" value={environment} />
      </DetailCard>

      {requiresReview ? (
        <Text style={{ color: '#b42318', lineHeight: '1.6' }}>
          The successful charge amount did not match the amount recorded when
          checkout was initialized. Review this transaction in the Paystack
          dashboard before reconciling it.
        </Text>
      ) : null}
    </NotificationLayout>
  );
}

DonationNotificationEmail.PreviewProps = {
  donorName: 'Amara Okafor',
  donorEmail: 'amara@example.com',
  baseAmount: '₦140,000',
  processingFee: '₦2,100',
  totalAmount: '₦142,100',
  frequency: 'one-time',
  project: 'Coding for Kids',
  reference: 'WA-DONATION-PREVIEW',
  paidAt: '29 Jul 2026, 12:30 UTC',
  channel: 'card',
  environment: 'test',
  requiresReview: false,
} satisfies DonationNotificationEmailProps;
