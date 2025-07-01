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
      title: 'Services',
      links: [
        { text: 'Web Development', href: '/services#web-development' },
        { text: 'AI Integration', href: '/services#ai-integration' },
        { text: 'WordPress', href: '/services#wordpress' },
        { text: 'Maintenance', href: '/maintenance' },
        { text: 'Consulting', href: '/services#consulting' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Portfolio', href: '/portfolio' },
        { text: 'Case Studies', href: '/case-studies' },
        { text: 'Blog', href: '/blog' },
        { text: 'FAQs', href: '/faqs' },
      ],
    },
    {
      title: 'Client Area',
      links: [
        { text: 'Book a Service', href: '/book' },
        { text: 'Submit Requirements', href: '/requirements' },
        { text: 'Client Dashboard', href: '/dashboard' },
        { text: 'Support', href: '/contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' },
        { text: 'Newsletter', href: '/newsletter' },
        { text: 'Referral Program', href: '/referral' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: '#' },
    { ariaLabel: 'Twitter', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
  ],
  footNote: `
    © 2024 Your Portfolio. All rights reserved. Built with passion and expertise.
  `,
};
