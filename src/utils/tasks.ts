import { ITaskDetails } from '@/types/tasks.type';

export const getOrganizerInfo = (
  task: ITaskDetails
): { name: string; link: string } => ({
  name: task.host?.name ?? `Organization ${task.organizationId ?? ''}`,
  link: task.host?.id
    ? `/profile/${task.host.id}`
    : task.organizationId
      ? `/profile/${task.organizationId}`
      : '#',
});

export const parseRequirements = (requirements?: string): string[] => {
  if (!requirements) return [];
  return requirements
    .replace(/^Requirements:\s*/i, '')
    .split(/(\.\s+|\n|(?=[A-Z][a-z]))/g)
    .map((r) => r.trim())
    .filter((r) => r.length > 0 && r !== '.' && r !== ' ');
};

export const parseDescription = (
  description: string
): (string | string[])[] => {
  return description
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return trimmed
          .split(/(?:- |• )/)
          .filter(Boolean)
          .map((i) => i.trim());
      }
      return trimmed;
    })
    .filter(Boolean) as (string | string[])[];
};
