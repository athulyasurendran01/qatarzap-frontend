import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nc-icon-outline ui-1_home-minimal',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Profile',
    icon: 'nc-icon-outline users_single-01',
    link: '/pages/profile-features/profile',
  },
/*  {
    title: 'Buy Credits',
    icon: 'nc-icon-outline shopping_cart-remove',
    link: '/pages/buycredits',
  },*/
  {
    title: 'Purchased Leads',
    icon: 'nc-icon-outline business_wallet-43',
    link: '/pages/purchased_leads',
  },
  {
    title: 'Change Password',
    icon: 'nc-icon-outline ui-1_lock-open',
    link: '/pages/password/change',
  },
  {
    title: 'Logout',
    icon: 'nc-icon-outline arrows-1_log-in',
    link: '/pages/logout',
  }
];
