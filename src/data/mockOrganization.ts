import { OrganizationDetailedProps } from '@/types';

export const mockOrganization: OrganizationDetailedProps[] = [
  {
    id: '1',
    name: 'Peace Volunteers',
    avatar: '/account/org1.png',
    description:
      '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
    email: 'peace@mail.com',
    phoneNumber: '(603) 555-0123',
    location: { id: 1, country: 'Ucraine', region: 'Kiev', city: 'Kyiv' },
    paymentOptions: [],
    tasks: [
      {
        id: 1,
        title: 'Peace Volunteers 1',
        status: 'CREATED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/org1.png',
        category: 'nature',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 2,
        title: 'Peace Volunteers 2',
        status: 'IN_PROGRESS',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'animal',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 3,
        title: 'Peace Volunteers 3',
        status: 'CLOSED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/Razer.png',
        category: 'food',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 4,
        title: 'Peace Volunteers 4',
        status: 'CREATED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 5,
        title: 'Peace Volunteers 4',
        status: 'COMPLETED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 6,
        title: 'Peace Volunteers 4',
        status: 'REJECTED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 7,
        title: 'Peace Volunteers 4',
        status: 'IN_PROGRESS',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 8,
        title: 'Peace Volunteers 4',
        status: 'CREATED',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
      {
        id: 9,
        title: 'Peace Volunteers 4',
        status: 'PENDING',
        description:
          '📦 Humanitarian aid coordination \n 🧭 Volunteer and event management \n 📣 Social media and outreach \n 🤝 Partner and recipient communication \n 📷 Photo and video documentation',
        avatar: '/account/amazon.png',
        category: 'medicine',
        startDate: '2025-05-01T14:05:00.000Z',
        endDate: '2025-05-01T14:05:00.000Z',
        startTime: '2025-11-19T14:30:00',
        locationName: { id: 1, country: '', region: '', city: 'Belgrade' },
      },
    ],
    reviews: [
      {
        id: 1,
        rating: 3,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-01T14:05:00.000Z',
        owner: { id: '1', name: 'Wade', avatar: '/account/rev1.png' },
      },
      {
        id: 2,
        rating: 5,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-13T10:05:00.000Z',
        owner: { id: '2', name: 'Shane', avatar: '/account/rev2.png' },
      },
      {
        id: 3,
        rating: 4,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-07-01T12:05:00.000Z',
        owner: { id: '3', name: 'Mitchell', avatar: '/account/rev3.png' },
      },
      {
        id: 4,
        rating: 3,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners. \n How to become a volunteer: step-by-step instructions for beginners.How to become a volunteer: step-by-step instructions for beginners. \n How to become a volunteer: step-by-step instructions for beginners.  How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-01T14:05:00.000Z',
        owner: { id: '1', name: 'Wade', avatar: '/account/rev1.png' },
      },
      {
        id: 5,
        rating: 5,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-13T10:05:00.000Z',
        owner: { id: '2', name: 'Shane', avatar: '/account/rev2.png' },
      },
      {
        id: 6,
        rating: 4,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-07-01T12:05:00.000Z',
        owner: { id: '3', name: 'Mitchell', avatar: '/account/rev3.png' },
      },
      {
        id: 7,
        rating: 3,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-01T14:05:00.000Z',
        owner: { id: '1', name: 'Wade', avatar: '/account/rev1.png' },
      },
      {
        id: 8,
        rating: 5,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-05-13T10:05:00.000Z',
        owner: { id: '2', name: 'Shane', avatar: '/account/rev2.png' },
      },
      {
        id: 9,
        rating: 4,
        comment:
          'How to become a volunteer: step-by-step instructions for beginners.',
        createdAt: '2025-07-01T12:05:00.000Z',
        owner: { id: '3', name: 'Mitchell', avatar: '/account/rev3.png' },
      },
    ],
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
