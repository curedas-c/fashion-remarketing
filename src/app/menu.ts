import { menu } from '@shared/models/menu.model';

export const MAIN_MENU: menu[] = [
  // Acceuil
  {
    path: '/dashboard/home',
    menu: {
      title: 'Acceuil',
      icon: 'home'
    }
  },
  // Events
  {
    path: '/dashboard/notification',
    menu: {
      title: 'Notifications',
      icon: 'campaign'
    }
  },
  {
    path: '/dashboard/promotion',
    menu: {
      title: 'Promotions',
      icon: 'local_offer'
    }
  },
  {
    path: '/dashboard/data',
    menu: {
      title: 'Informations In-App',
      icon: 'description'
    }
  },
  {
    path: '/dashboard/article',
    menu: {
      title: 'Articles',
      icon: 'local_mall'
    }
  },
  {
    path: '/dashboard/article-category',
    menu: {
      title: "Catégories d'Articles",
      icon: 'category'
    }
  },
  {
    path: '/dashboard/order',
    menu: {
      title: "Commandes",
      icon: 'receipt_long'
    }
  }
];
