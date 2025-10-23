import { calculateDistanceInMeters } from '@/lib/mapUtils';
import { MarkerCategoryEnum } from '@/types/mapType';
import {
  IExtendedITaskProps,
  ITask,
  ITaskDetails,
  TaskActionType,
  TaskStatus,
  UserParticipationStatus,
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
  [
    MarkerCategoryEnum.Medicine,
    MarkerCategoryEnum.Nature,
    MarkerCategoryEnum.Animal,
  ],
  [MarkerCategoryEnum.Nature],
  [MarkerCategoryEnum.Animal, MarkerCategoryEnum.Medicine],
  [MarkerCategoryEnum.Food],
  [MarkerCategoryEnum.Medicine, MarkerCategoryEnum.Nature],
  [MarkerCategoryEnum.Animal],
  [MarkerCategoryEnum.Food, MarkerCategoryEnum.Nature],
  [MarkerCategoryEnum.Nature],
  [MarkerCategoryEnum.Medicine],
  [MarkerCategoryEnum.Animal, MarkerCategoryEnum.Medicine],
  [MarkerCategoryEnum.Food, MarkerCategoryEnum.Nature],
  [MarkerCategoryEnum.Medicine, MarkerCategoryEnum.Food],
  [MarkerCategoryEnum.Nature, MarkerCategoryEnum.Animal],
  [MarkerCategoryEnum.Food, MarkerCategoryEnum.Medicine],
  [MarkerCategoryEnum.Nature],
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
      category: CATEGORIES[i],
      distance: distanceStr,
      lat,
      lng,
      description: DESCRIPTIONS[i],
      isSelected: false,
      actionType: TaskActionType.VOLUNTEERING,
      userParticipationStatus: UserParticipationStatus.NONE,
      organizationId: `org-${i}`,
      onToggleDescription: (): void => {},
    };
  });
}

export function extendTaskToDetails(
  task: ITask,
  overrides?: Partial<ITaskDetails>
): ITaskDetails {
  return {
    ...task,
    picture:
      overrides?.picture ??
      'https://res.cloudinary.com/dinpgnkhh/image/upload/v1760461912/dog_gc3uel.png',
    status: overrides?.status ?? ('PENDING' as TaskStatus),
    locationName: overrides?.locationName ?? 'Unknown location',
    isOrganization: overrides?.isOrganization ?? false,
    organizationId: overrides?.organizationId ?? `org-${task.id}`,
    startDate: overrides?.startDate ?? new Date().toISOString().slice(0, 10),
    startTime: overrides?.startTime ?? '09:00 AM',
    endDate: overrides?.endDate ?? new Date().toISOString().slice(0, 10),
    requirements:
      overrides?.requirements ??
      [
        'Stray, abandoned, and injured animals currently living in our shelter.',
        'Requirements:',
        'Love and compassion for animals',
        'Reliability and responsibility',
        'Ability to dedicate at least 2–3 hours per week.',
      ].join(' '),
    actionType: overrides?.actionType ?? TaskActionType.VOLUNTEERING,
    userParticipationStatus:
      overrides?.userParticipationStatus ?? UserParticipationStatus.NONE,
    ...overrides,
  };
}

export function generateMockTasks(tasks: ITask[]): ITaskDetails[] {
  return tasks.map((task, i) =>
    extendTaskToDetails(task, {
      status: 'IN_PROGRESS',
      locationName: MOCK_LOCATIONS[i] || `${i + 1}`,
      isOrganization: i % 2 === 0,
      organizationId: `org-${i}`,
    })
  );
}
