import { UserDetailedProps } from '@/types';

export const mockUser: UserDetailedProps = {
  id: 1,
  name: 'Esther Howard',
  avatar: '/account/user.png',
  customerId: process.env.STRIPE_CUSTOMER_ID!,
  paymentOptions: [
    { id: 1, name: process.env.STRIPE_PAYMENT_METHOD_1! },
    { id: 2, name: process.env.STRIPE_PAYMENT_METHOD_2! },
  ],
  email: 'test@mail.com',
  siteRole: 'ADMIN',
  bio: 'Volunteer | Helping Where It\’s Needed Most \n  Actively involved in humanitarian aid, community support, and social initiatives. \n 💙 Supporting people in crisis \n📦 Delivering essentials \n 🛠 Organizing local initiatives \n 🤝 Connecting those who want to help with those in need \n \n  Driven by compassion, powered by teamwork. \n Let\’s make a difference — together. \n 📞 +380 (XX) XXX-XX-XX',
  gender: '',
  birthDate: '',
  phoneNumber: '',
  userSettings: {
    theme: 'dark',
    language: 'en',
  },
  location: {
    id: 1,
    country: '',
    region: '',
    city: 'Belgrade',
  },
  hostedTasks: [
    {
      id: 1,
      title: '',
      status: '',
    },
  ],
  joinedTasks: [
    {
      id: 1,
      title: 'Peace Volunteers',
      status: '',
      description:
        '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
      avatar: '/account/Razer.png',
      category: 'nature',
    },
    {
      id: 2,
      title: 'Peace Volunteers',
      status: '',
      description:
        '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
      avatar: '/account/amazon.png',
      category: 'animal',
    },
    {
      id: 3,
      title: 'Peace Volunteers',
      status: '',
      description:
        '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
      avatar: '/account/Razer.png',
      category: 'food',
    },
    {
      id: 4,
      title: 'Peace Volunteers',
      status: '',
      description:
        '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
      avatar: '/account/amazon.png',
      category: 'medicine',
    },
  ],
  reviewsWritten: [
    {
      id: 1,
      rating: 3,
      comment: '',
      createdAt: '',
    },
  ],
  reviewsReceived: [
    {
      id: 1,
      rating: 3,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-01T14:05:00.000Z',
      owner: { id: 1, name: 'Wade', avatar: '/account/rev1.png' },
    },
    {
      id: 2,
      rating: 5,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-13T10:05:00.000Z',
      owner: { id: 2, name: 'Shane', avatar: '/account/rev2.png' },
    },
    {
      id: 3,
      rating: 4,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-07-01T12:05:00.000Z',
      owner: { id: 3, name: 'Mitchell', avatar: '/account/rev3.png' },
    },
    {
      id: 4,
      rating: 3,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-01T14:05:00.000Z',
      owner: { id: 1, name: 'Wade', avatar: '/account/rev1.png' },
    },
    {
      id: 5,
      rating: 5,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-13T10:05:00.000Z',
      owner: { id: 2, name: 'Shane', avatar: '/account/rev2.png' },
    },
    {
      id: 6,
      rating: 4,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-07-01T12:05:00.000Z',
      owner: { id: 3, name: 'Mitchell', avatar: '/account/rev3.png' },
    },
    {
      id: 7,
      rating: 3,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-01T14:05:00.000Z',
      owner: { id: 1, name: 'Wade', avatar: '/account/rev1.png' },
    },
    {
      id: 8,
      rating: 5,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-05-13T10:05:00.000Z',
      owner: { id: 2, name: 'Shane', avatar: '/account/rev2.png' },
    },
    {
      id: 9,
      rating: 4,
      comment:
        'How to become a volunteer: step-by-step instructions for beginners.',
      createdAt: '2025-07-01T12:05:00.000Z',
      owner: { id: 3, name: 'Mitchell', avatar: '/account/rev3.png' },
    },
  ],
  organizations: [
    {
      id: 1,
      name: 'Peace Volunteers',
      description:
        'Peace Volunteers is a volunteer organization making a real difference through compassion, solidarity, and peaceful action.',
      members: [
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
      ],
      logo: '/account/org1.png',
    },
    {
      id: 2,
      name: 'Peace Volunteers',
      description:
        'Peace Volunteers is a volunteer organization making a real difference through compassion, solidarity, and peaceful action.',
      members: [
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
      ],
      logo: '/account/org2.png',
    },
    {
      id: 3,
      name: 'Peace Volunteers',
      description:
        'Peace Volunteers is a volunteer organization making a real difference through compassion, solidarity, and peaceful action.',
      members: [
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
        { id: '', name: '', email: '' },
      ],
      logo: '/account/amazon.png',
    },
  ],
};
