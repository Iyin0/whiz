import Link from 'next/link';
import Image from 'next/image';
import { RiFacebookCircleFill, RiInstagramLine, RiLinkedinBoxFill, RiTwitterXLine, RiYoutubeFill } from 'react-icons/ri';

export default function Footer() {
  const date = new Date();

  const contacts = [
    {
      title: 'Address:',
      value: ['6, Mount Park Road, Ealing Broadway, London. W5 2RP']
    },
    {
      title: 'Contact:',
      value: ['+447587873007', 'whizacademy4all@gmail.com']
    },
  ];

  const socials = [
    {
      title: 'Facebook',
      value: 'https://www.facebook.com/share/18iPXg3E6u',
      icon: RiFacebookCircleFill
    },
    {
      title: 'Instagram',
      value: 'https://www.instagram.com/whizacademy_',
      icon: RiInstagramLine
    },
    {
      title: 'Twitter',
      value: 'https://x.com/Whizacademy_',
      icon: RiTwitterXLine
    },
    {
      title: 'LinkedIn',
      value: 'https://www.linkedin.com/company/whizacademy4all',
      icon: RiLinkedinBoxFill
    },
    {
      title: 'YouTube',
      value: '#',
      icon: RiYoutubeFill 
    }
  ];

  const firstColumn = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Projects',
      link: '/projects'
    },
    {
      title: 'FAQs',
      link: '#faqs'
    },
    {
      title: 'Policies',
      link: '#'
    },
    {
      title: 'SIME Foundation',
      link: '#'
    },
  ];

  const secondColumn = [
    {
      title: 'Volunteer',
      link: '/contact#volunteer'
    },
    {
      title: 'Sponsorship',
      link: '/contact#sponsorship'
    },
    {
      title: 'Partnership',
      link: '/contact#partnership'
    },
    {
      title: 'Donate',
      link: '/contact#donate'
    },
    {
      title: 'Contact Us',
      link: '/contact'
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#737373]/50 to-transparent min-h-[600px] px-4 sm:px-20 flex flex-col justify-end">
      <div className="flex flex-col sm:justify-end">
        <div className="flex flex-col sm:flex-row justify-between gap-12 sm:gap-8 sm:items-end">
          <div className="flex flex-col gap-8">
            <Link href="/">
              <Image src="/images/NavLogo.png" alt="Whiz Academy" width={131} height={76} />
            </Link>
            {contacts.map((contact) => (
              <div key={contact.title} className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">{contact.title}</h3>
                {contact.value.map((item) => (
                  <p key={item} className="text-sm">{item}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-4">
              {firstColumn.map((item) => (
                <Link key={item.title} href={item.link} className="sm:text-end">{item.title}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {secondColumn.map((item) => (
                <Link key={item.title} href={item.link} className="sm:text-end">{item.title}</Link>
              ))}
            </div>
          </div>
       </div>
       <div className="flex justify-around sm:justify-start gap-4 mt-16 mb-11">
          {socials.map((social) => (
            <Link key={social.title} href={social.value} target="_blank" rel="noopener noreferrer">
              <social.icon className="text-2xl" />
            </Link>
          ))}
        </div>
      </div>
      <p className="text-center text-sm py-5 border-t border-black">{`© ${date.getFullYear()} Whiz Academy. All rights reserved.`}</p>
    </footer>
  );
}