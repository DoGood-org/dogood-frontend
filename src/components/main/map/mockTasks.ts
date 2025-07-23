import { calculateDistanceInMeters } from '@/lib/mapUtils';
import { MarkerCategoryEnum } from '@/types/mapType';
import { ITask } from '@/types/tasks.type';

const TITLES = [
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
];

export function generateTasks(
  userLat: number,
  userLng: number,
  radiusInMeters: number = 3000
): ITask[] {
  return TITLES.map(([title, subtitle], i) => {
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
      id: `${Math.random().toString(36).substring(2, 15)}-${i}`,
      title,
      subtitle,
      category: CATEGORIES[i],
      distance: distanceStr,
      lat,
      lng,
      description: DESCRIPTIONS[i],
      isSelected: false,
    };
  });
}
