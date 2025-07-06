import { ITask, MarkerCategoryEnum } from '@/types/mapType';

// export const TASKS = [
//   {
//     id: '1',
//     title: 'Mountain health checkpoint',
//     subtitle: 'Help set up first aid at trails',
//     category: [MarkerCategoryEnum.Medicine],
//     distance: '1 km',
//     lat: 45.8863,
//     lng: 6.8002,
//     description: 'Set up temporary medical aid near common hiking paths.',
//   },
//   {
//     id: '2',
//     title: 'Clean up alpine lakes',
//     subtitle: 'Preserve biodiversity at altitude',
//     category: [MarkerCategoryEnum.Nature],
//     distance: '2 km',
//     lat: 45.8831,
//     lng: 6.7981,
//     description:
//       'Join efforts to clean lakes and remove plastic waste in mountain areas.',
//   },
//   {
//     id: '3',
//     title: 'Rescue center animal support',
//     subtitle: 'Help care for rescued mountain wildlife',
//     category: [MarkerCategoryEnum.Animal],
//     distance: '3 km',
//     lat: 45.8842,
//     lng: 6.7968,
//     description:
//       'Volunteer for basic animal care and feeding at the alpine wildlife station.',
//   },
//   {
//     id: '4',
//     title: 'Hiker nutrition booth',
//     subtitle: 'Distribute snacks and info at trailhead',
//     category: [MarkerCategoryEnum.Food],
//     distance: '500 m',
//     lat: 45.8855,
//     lng: 6.802,
//     description:
//       'Support trekkers by handing out food and explaining trail safety.',
//   },
//   {
//     id: '5',
//     title: 'Trail maintenance crew',
//     subtitle: 'Repair paths and signage in the mountains',
//     category: [MarkerCategoryEnum.Medicine, MarkerCategoryEnum.Nature],
//     distance: '4 km',
//     lat: 45.8878,
//     lng: 6.7995,
//     description:
//       'Join a team to fix damaged trails and install new signs in popular hiking areas.',
//   },
//   {
//     id: '6',
//     title: 'Wildlife observation post',
//     subtitle: 'Monitor and protect local fauna',
//     category: [MarkerCategoryEnum.Animal],
//     distance: '3 km',
//     lat: 45.885,
//     lng: 6.8,
//     description:
//       'Help track and protect wildlife in the area by monitoring their habitats.',
//   },
//   {
//     id: '7',
//     title: 'Eco-friendly picnic area',
//     subtitle: 'Set up sustainable dining spots',
//     category: [MarkerCategoryEnum.Food],
//     distance: '2 km',
//     lat: 45.8865,
//     lng: 6.8015,
//     description:
//       'Create picnic areas using local materials and promote eco-friendly practices.',
//   },
// ];

// type Task = {
//   id: string;
//   title: string;
//   subtitle: string;
//   category: MarkerCategoryEnum[];
//   distance: string;
//   lat: number;
//   lng: number;
//   description: string;
// };

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
