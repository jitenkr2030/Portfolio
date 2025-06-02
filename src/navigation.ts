import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    // Main
    { text: 'Home', href: getPermalink('/'), icon: 'tabler:home' },
    { text: 'About Me', href: getPermalink('/about'), icon: 'tabler:user' },
    { text: 'Portfolio', href: getPermalink('/portfolio'), icon: 'tabler:briefcase' },
    { text: 'Services', href: getPermalink('/services'), icon: 'tabler:settings' },
    { text: 'Contact', href: getPermalink('/contact'), icon: 'tabler:mail' },

    // Client Area Dropdown
    {
      text: 'Client Area',
      icon: 'tabler:user-circle',
      links: [
        { text: 'Book a Service', href: getPermalink('/book'), icon: 'tabler:calendar-plus' },
        { text: 'Submit Requirements', href: getPermalink('/requirements'), icon: 'tabler:upload' },
        { text: 'Payment', href: getPermalink('/payment'), icon: 'tabler:credit-card' },
        { text: 'Client Dashboard', href: getPermalink('/dashboard'), icon: 'tabler:dashboard' },
      ],
      divider: true,
    },

    // Admin Dropdown
    {
      text: 'Admin',
      icon: 'tabler:lock',
      links: [
        { text: 'Admin Panel', href: getPermalink('/admin'), icon: 'tabler:settings-cog' },
      ],
      divider: true,
    },

    // More Dropdown
    {
      text: 'More',
      icon: 'tabler:apps',
      links: [
        { text: 'FAQs', href: getPermalink('/faqs'), icon: 'tabler:help' },
        { text: 'Newsletter', href: getPermalink('/newsletter'), icon: 'tabler:mail-opened' },
        { text: 'Referral', href: getPermalink('/referral'), icon: 'tabler:users' },
        { text: 'Case Studies', href: getPermalink('/case-studies/sample-case'), icon: 'tabler:book' },
        { divider: true },
        { text: 'Privacy Policy', href: getPermalink('/privacy-policy'), icon: 'tabler:shield-lock' },
        { text: 'Terms', href: getPermalink('/terms'), icon: 'tabler:file-description' },
      ],
    },
  ],
  actions: [
    { text: 'Book a Service', href: getPermalink('/book'), variant: 'primary', icon: 'tabler:calendar-plus' }
  ],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
