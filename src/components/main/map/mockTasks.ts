import { ITask, MarkerCategoryEnum } from '@/types/mapType';

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

export function generateTasks(userLat: number, userLng: number): ITask[] {
  return TITLES.map(([title, subtitle], i) => {
    const offsetLat = (Math.random() - 0.5) * 0.01;
    const offsetLng = (Math.random() - 0.5) * 0.01;
    const lat = parseFloat((userLat + offsetLat).toFixed(6));
    const lng = parseFloat((userLng + offsetLng).toFixed(6));
    const distance = `${(Math.random() * 4 + 0.5).toFixed(1)} km`;

    return {
      id: `${Math.random().toString(36).substring(2, 15)}-${i}`,
      title,
      subtitle,
      category: CATEGORIES[i],
      distance,
      lat,
      lng,
      description: DESCRIPTIONS[i],
      isSelected: false,
    };
  });
}
