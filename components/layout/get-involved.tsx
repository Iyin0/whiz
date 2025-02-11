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
    <div className="flex flex-col items-center justify-center py-20 sm:py-28 px-4 sm:px-[160px] gap-10 sm:gap-16">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-20 items-center justify-center">
        <h2 className="text-3xl sm:text-4xl max-w-[567px] text-center sm:text-left">Get <strong>Involved</strong> and <strong>Make a Difference</strong></h2>
        <p className="text-lg sm:text-xl max-w-[611px] text-justify sm:text-left">Become a volunteer or support our mission through sponsorship, partnership, and donations. Together, we can empower rural communities in Nigeria with digital literacy.</p>
      </div>
      <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8">
        {list.map((item, index) => (
          <Link href={item.route} key={item.title} className={cn('text-base py-2 px-3 rounded-lg text-white font-bold flex justify-center items-center sm:w-fit h-fit', index%2 === 0 ? 'bg-secondary' : 'bg-primary')}>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}