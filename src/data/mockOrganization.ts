import { OrganizationDetailedProps } from '@/types';

export const mockOrganization: OrganizationDetailedProps[] = [
  {
    id: '1',
    name: 'Peace Volunteers',
    avatar: '/account/Razer.png',
    description:
      '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
    email: 'peace@mail.com',
    phoneNumber: '',
    location: { id: 1, country: '', region: '', city: 'Belgrade' },
    paymentOptions: [],
    tasks: [],
    reviews: [],
    reviewsWrittenOrg: [],
    members: [
      {
        id: '1',
        userId: '5',
        organizationId: '1',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    ],
    moreInfo:
      'Who we are \nPeace Volunteers is a humanitarian organization based in Belgrade, dedicated to supporting vulnerable communities through volunteer-driven initiatives \n Mission & Goals \n \n Our mission is to provide direct support to people in crisis, empower volunteers to take action, and build stronger, more compassionate communities \n Key focus areas:\n 🐾 Animal care and protection \n🌱 Environmental preservation \n🍲 Food distribution and humanitarian aid \n 🎓 Education and community outreach \n \n Achievements & Impact \n 3,200+ hours contributed by volunteers \n 12 500 meals distributed since 2020 \n 200 rescued animals supported',
  },
  {
    id: '2',
    name: 'Organization 2',
    avatar: '/account/Amazon.png',
    description:
      '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
    email: '',
    phoneNumber: '',
    location: { id: 1, country: '', region: '', city: 'Belgrade' },
    paymentOptions: [],
    tasks: [
      {
        id: 1,
        title: 'Peace Volunteers 1',
        status: 'CREATED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/Razer.png',
        category: 'nature',
      },
      {
        id: 2,
        title: 'Peace Volunteers 2',
        status: 'IN_PROGRESS',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'animal',
      },
      {
        id: 3,
        title: 'Peace Volunteers 3',
        status: 'COMPLETED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        // avatar: '/account/Razer.png',
        category: 'food',
      },
      {
        id: 4,
        title: 'Peace Volunteers 4',
        status: 'CREATED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
      },
    ],
    reviews: [],
    reviewsWrittenOrg: [],
    members: [
      {
        id: '1',
        userId: '5',
        organizationId: '1',
        role: 'MODERATOR',
        status: 'ACTIVE',
      },
      {
        id: '2',
        userId: '1',
        organizationId: '1',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
      {
        id: '3',
        userId: '6',
        organizationId: '1',
        role: 'MEMBER',
        status: 'PENDING',
      },
    ],
  },
  {
    id: '3',
    name: 'Organization 3',
    avatar: '',
    description:
      '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
    email: '',
    phoneNumber: '',
    location: { id: 1, country: '', region: '', city: 'Belgrade' },
    paymentOptions: [],
    tasks: [],
    reviews: [],
    reviewsWrittenOrg: [],
    members: [
      {
        id: '1',
        userId: '50',
        organizationId: '1',
        role: 'MEMBER',
        status: 'ACTIVE',
      },
      {
        id: '2',
        userId: '1',
        organizationId: '1',
        role: 'MODERATOR',
        status: 'ACTIVE',
      },
      {
        id: '3',
        userId: '6',
        organizationId: '1',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    ],
  },
];
