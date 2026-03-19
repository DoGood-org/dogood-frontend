import { NominatimResult } from '@/components/tasks/createPage/Form/LocationAutocomplete';
import { calculateDistanceInMeters } from '@/lib/mapUtils';
import { TaskCategoryEnum } from '@/types/createTask.type';
// import { MarkerCategoryEnum } from '@/types/mapType';
import {
  HostUser,
  IExtendedITaskProps,
  ITask,
  ITaskDetails,
  OrganizationFromBack,
  TaskStatus,
} from '@/types/tasks.type';

const TITLES = [
  ['Help Animals in Need', 'Preserve biodiversity at altitude'],
  ['Mountain health checkpoint', 'Help set up first aid at trails'],
  ['Clean up alpine lakes', 'Preserve biodiversity at altitude'],
  ['Rescue center animal support', 'Help care for rescued wildlife'],
  ['Hiker nutrition booth', 'Distribute snacks and info at trailhead'],
  ['Trail maintenance crew', 'Repair paths and signage'],
  ['Wildlife observation post', 'Monitor and protect fauna'],
  ['Eco-friendly picnic area', 'Set up sustainable dining spots'],
  ['Community garden project', 'Create green spaces for locals'],
  ['Forest fire prevention team', 'Help protect against wildfires'],
  ['Mountain rescue training', 'Assist in emergency response drills'],
  ['Trail safety workshop', 'Educate hikers on safe practices'],
  ['Wildflower planting initiative', 'Enhance local flora diversity'],
  ['Recycling awareness campaign', 'Promote waste reduction in nature'],
  ['Eco-friendly workshops', 'Teach sustainable practices'],
];

const DESCRIPTIONS = [
  `Join our volunteer team to care for rescued animals — feeding, cleaning, walking, and giving 
  them love and attention. You’ll also help with basic shelter maintenance and socializing animals 
  to prepare them for adoption.
Donation Needs:
In addition to your time, we urgently need donations for:
- Animal food (dry & wet)
- Veterinary care & medicine
- Bedding, blankets, toys
- Cleaning supplies
🤝 How to Help:
- Volunteer your time at the shelter
- Donate items or funds to support our work
- Share our cause on social media to reach more people
❤ Every small act makes a big difference in an animal’s life.`,
  'Set up temporary medical aid near common hiking paths.',
  'Join efforts to clean lakes and remove plastic waste.',
  'Volunteer for basic animal care and feeding.',
  'Support trekkers with food and trail info.',
  'Fix damaged trails and install new signs.',
  'Monitor and protect wildlife habitats.',
  'Create picnic areas and promote sustainability.',
  'Establish community gardens using local plants.',
  'Assist in fire prevention and awareness.',
  'Participate in rescue drills and training.',
  'Educate hikers on safety and emergency procedures.',
  'Plant wildflowers to enhance biodiversity.',
  'Raise awareness about recycling and waste reduction in nature.',
  'Organize workshops on eco-friendly practices.',
];

const CATEGORIES = [
  [TaskCategoryEnum.Medicine, TaskCategoryEnum.Nature, TaskCategoryEnum.Animal],
  [TaskCategoryEnum.Nature],
  [TaskCategoryEnum.Animal, TaskCategoryEnum.Medicine],
  [TaskCategoryEnum.Food],
  [TaskCategoryEnum.Medicine, TaskCategoryEnum.Nature],
  [TaskCategoryEnum.Animal],
  [TaskCategoryEnum.Food, TaskCategoryEnum.Nature],
  [TaskCategoryEnum.Nature],
  [TaskCategoryEnum.Donation],
  [TaskCategoryEnum.Animal, TaskCategoryEnum.Medicine],
  [TaskCategoryEnum.Food, TaskCategoryEnum.Nature],
  [TaskCategoryEnum.Medicine, TaskCategoryEnum.Food],
  [TaskCategoryEnum.Nature, TaskCategoryEnum.Animal],
  [TaskCategoryEnum.Food, TaskCategoryEnum.Medicine],
  [TaskCategoryEnum.Nature],
];

const MOCK_LOCATIONS = [
  'Willow Creek, Oregon',
  'Mount Hood National Forest',
  'Columbia River Gorge',
  'Silver Falls State Park',
  'Crater Lake National Park',
  'Wallowa-Whitman National Forest',
  'Ecola State Park',
  'Mount Tabor Park',
  'Forest Park, Portland',
  'Cascade Locks, Oregon',
  'Trillium Lake',
  'Multnomah Falls',
  'Sisters, Oregon',
  'Cannon Beach',
];

export function generateTasks(
  userLat: number,
  userLng: number,
  radiusInMeters: number = 3000
): IExtendedITaskProps[] {
  return TITLES.map(([title, subtitle], i): IExtendedITaskProps => {
    // Generate point within radius
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radiusInMeters;

    const deltaLat = (distance * Math.cos(angle)) / 111320; // meters to degrees lat
    const deltaLng =
      (distance * Math.sin(angle)) /
      (111320 * Math.cos((userLat * Math.PI) / 180)); // adjust for lng distortion

    const lat = parseFloat((userLat + deltaLat).toFixed(6));
    const lng = parseFloat((userLng + deltaLng).toFixed(6));
    const realDistance = calculateDistanceInMeters(userLat, userLng, lat, lng);
    const distanceStr = `${(realDistance / 1000).toFixed(2)} km`;

    return {
      id: `task-${i}`,
      title,
      subtitle,
      picture:
        'https://res.cloudinary.com/dinpgnkhh/image/upload/v1760461912/dog_gc3uel.png',
      category: CATEGORIES[i],
      distance: distanceStr,
      lat,
      lng,
      description: DESCRIPTIONS[i],
      organizationId: `id: org-${i}`,
      isOrganization: true,
      host: {
        type: 'ORGANIZATION',
        organization: {
          id: `id: org-${i}`,
          name: `Organization ${i + 1}`,
          avatar:
            'https://res.cloudinary.com/dyamzitdn/image/upload/v1773335640/Ellipse_1_ls9irl.jpg',
        },
      },
      onToggleDescription: (): void => {},
      status: TaskStatus.PENDING,
      locationName: MOCK_LOCATIONS[i] || 'Unknown location',
      startDate: new Date().toISOString().slice(0, 10),
      startTime: '09:00',
      endDate: new Date().toISOString().slice(0, 10),
      amount: 100,
      requirements: [
        'Stray, abandoned, and injured animals currently living in our shelter.',
        'Requirements:',
        'Love and compassion for animals',
        'Reliability and responsibility',
        'Ability to dedicate at least 2–3 hours per week.',
      ].join(' '),
    };
  });
}

export function extendTaskToDetails(
  task: ITask,
  i: number,
  overrides?: Partial<ITaskDetails>
): ITaskDetails {
  return {
    ...task,
    ...overrides,
    picture:
      overrides?.picture ??
      'https://res.cloudinary.com/dinpgnkhh/image/upload/v1760461912/dog_gc3uel.png',
    status: overrides?.status ?? ('PENDING' as TaskStatus),
    locationName: overrides?.locationName ?? 'Unknown location',
    organizationId: overrides?.organizationId ?? `id: org-${i}`,
    isOrganization: overrides?.isOrganization ?? true,
    host: overrides?.host ?? {
      type: 'ORGANIZATION',
      organization: {
        id: `id: org-${i}`,
        name: 'Animal Rescue',
        avatar:
          'https://res.cloudinary.com/dyamzitdn/image/upload/v1773335640/Ellipse_1_ls9irl.jpg',
      },
    },
    startDate: overrides?.startDate ?? new Date().toISOString().slice(0, 10),
    startTime: overrides?.startTime ?? '09:00 AM',
    endDate: overrides?.endDate ?? new Date().toISOString().slice(0, 10),
    amount: overrides?.amount ?? 100,
    requirements:
      overrides?.requirements ??
      [
        'Stray, abandoned, and injured animals currently living in our shelter.',
        'Requirements:',
        'Love and compassion for animals',
        'Reliability and responsibility',
        'Ability to dedicate at least 2–3 hours per week.',
      ].join(' '),
  };
}

export function generateMockTasks(tasks: ITask[]): ITaskDetails[] {
  return tasks.map((task, i) =>
    extendTaskToDetails(task, i, {
      status: TaskStatus.IN_PROGRESS,
      locationName: MOCK_LOCATIONS[i] || `${i + 1}`,
      organizationId: `id: org-${i}`,
    })
  );
}

// Mock createSerch
export const MOCK_LOCATIONS_SEARCH: NominatimResult[] = [
  {
    place_id: '1',
    display_name: 'Kyiv, Ukraine',
    lat: '50.4501',
    lon: '30.5234',
  },
  {
    place_id: '2',
    display_name: 'Paris, France',
    lat: '48.8566',
    lon: '2.3522',
  },
  {
    place_id: '3',
    display_name: 'Berlin, Germany',
    lat: '52.5200',
    lon: '13.4050',
  },
  {
    place_id: '4',
    display_name: 'London, United Kingdom',
    lat: '51.5074',
    lon: '-0.1278',
  },
  {
    place_id: '5',
    display_name: 'New York, USA',
    lat: '40.7128',
    lon: '-74.0060',
  },
  {
    place_id: '6',
    display_name: 'Tokyo, Japan',
    lat: '35.6895',
    lon: '139.6917',
  },
  {
    place_id: '7',
    display_name: 'Warsaw, Poland',
    lat: '52.2297',
    lon: '21.0122',
  },
  {
    place_id: '8',
    display_name: 'Rome, Italy',
    lat: '41.9028',
    lon: '12.4964',
  },
  {
    place_id: '9',
    display_name: 'Barcelona, Spain',
    lat: '41.3851',
    lon: '2.1734',
  },
];

export const MOCK_ORGANIZATIONS: OrganizationFromBack[] = [
  {
    id: '1',
    name: 'Help Ukraine',
    avatar:
      'https://res.cloudinary.com/dyamzitdn/image/upload/v1773335640/Ellipse_1_ls9irl.jpg',
  },
  {
    id: '2',
    name: 'Animal Rescue',
    avatar:
      'https://res.cloudinary.com/dyamzitdn/image/upload/v1773335640/Ellipse_1_ls9irl.jpg',
  },
];

export const MOCK_CURRENT_USER: HostUser = {
  id: 'user-123',
  name: 'Test User',
  avatar:
    'https://res.cloudinary.com/dyamzitdn/image/upload/v1773335640/Ellipse_1_ls9irl.jpg',
};
