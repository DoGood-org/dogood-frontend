import { MarkerCategoryEnum } from "@/types/mapType";

export const TASKS = [
  {
    id: '1',
    title: 'Mountain health checkpoint',
    subtitle: 'Help set up first aid at trails',
    category: [MarkerCategoryEnum.Medicine],
    distance: '1 km',
    lat: 45.8863,
    lng: 6.8002,
    description: 'Set up temporary medical aid near common hiking paths.',
  },
  {
    id: '2',
    title: 'Clean up alpine lakes',
    subtitle: 'Preserve biodiversity at altitude',
    category: [MarkerCategoryEnum.Nature],
    distance: '2 km',
    lat: 45.8831,
    lng: 6.7981,
    description:
      'Join efforts to clean lakes and remove plastic waste in mountain areas.',
  },
  {
    id: '3',
    title: 'Rescue center animal support',
    subtitle: 'Help care for rescued mountain wildlife',
    category: [MarkerCategoryEnum.Animal],
    distance: '3 km',
    lat: 45.8842,
    lng: 6.7968,
    description:
      'Volunteer for basic animal care and feeding at the alpine wildlife station.',
  },
  {
    id: '4',
    title: 'Hiker nutrition booth',
    subtitle: 'Distribute snacks and info at trailhead',
    category: [MarkerCategoryEnum.Food],
    distance: '500 m',
    lat: 45.8855,
    lng: 6.802,
    description:
      'Support trekkers by handing out food and explaining trail safety.',
  },
  {
    id: '5',
    title: 'Trail maintenance crew',
    subtitle: 'Repair paths and signage in the mountains',
    category: [MarkerCategoryEnum.Medicine, MarkerCategoryEnum.Nature],
    distance: '4 km',
    lat: 45.8878,
    lng: 6.7995,
    description:
      'Join a team to fix damaged trails and install new signs in popular hiking areas.',
  },
  {
    id: '6',
    title: 'Wildlife observation post',
    subtitle: 'Monitor and protect local fauna',
    category: [MarkerCategoryEnum.Animal],
    distance: '3 km',
    lat: 45.8850,
    lng: 6.8000,
    description:
      'Help track and protect wildlife in the area by monitoring their habitats.',
  },
  {
    id: '7',
    title: 'Eco-friendly picnic area',
    subtitle: 'Set up sustainable dining spots',
    category: [MarkerCategoryEnum.Food],
    distance: '2 km',
    lat: 45.8865,
    lng: 6.8015,
    description:
      'Create picnic areas using local materials and promote eco-friendly practices.',
  }
];
