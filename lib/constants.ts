import { TbMail, TbMapPin, TbPhone } from 'react-icons/tb';

export const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const contacts = [
  {
    label: 'Call',
    icon: TbPhone,
    value: ['+447587873007'],
  },
  {
    label: 'Visit',
    icon: TbMapPin,
    value: ['6, Mount Park Road, Ealing Broadway, London. W5 2RP'],
  },
  {
    label: 'Email',
    icon: TbMail,
    value: ['whizacademy4all@gmail.com'],
  },
];
