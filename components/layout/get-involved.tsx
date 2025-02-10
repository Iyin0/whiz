import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function GetInvolved() {
  const list = [
    {
      title: 'Volunteer',
      route: '/contact#volunteer',
    },
    {
      title: 'Sponsorship',
      route: '/contact#sponsorship',
    },
    {
      title: 'Partnership',
      route: '/contact#partnership',
    },
    {
      title: 'Donations',
      route: '/contact#donations',
    }
  ];
  return (
    <div className="flex flex-col min-h-[400px] items-center justify-center px-[160px] gap-16">
      <div className="flex gap-20 items-center justify-center">
        <h2 className="text-4xl max-w-[567px]">Get <strong>Involved</strong> and <strong>Make a Difference</strong></h2>
        <p className="text-xl max-w-[611px]">Become a volunteer or support our mission through sponsorship, partnership, and donations. Together, we can empower rural communities in Nigeria with digital literacy.</p>
      </div>
      <div className="flex gap-8">
        {list.map((item, index) => (
          <Link href={item.route} key={item.title} className={cn('text-base py-2 px-3 rounded-lg text-white font-bold w-fit h-fit', index%2 === 0 ? 'bg-secondary' : 'bg-primary')}>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}