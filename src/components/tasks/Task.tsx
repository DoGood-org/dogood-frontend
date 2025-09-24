'use client';

import { useEffect, useState } from 'react';
import { TaskCardList } from './TaskCard/TaskCardList';
import { ITask } from '@/types/tasks.type';
import { generateTasks } from '../main/map/mockTasks';

export const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    // Ці координати можуть бути динамічними (наприклад, з геолокації користувача)
    const userLat = 49.8397;
    const userLng = 24.0297;
    const radius = 5000; // радіус 5 км

    // Генеруємо завдання і зберігаємо їх у стані
    const generatedTasks = generateTasks(userLat, userLng, radius);
    setTasks(generatedTasks);
  }, []);
  return (
    <div>
      {tasks.length > 0 ? (
        <TaskCardList tasks={tasks} />
      ) : (
        <p>Завдань не знайдено.</p>
      )}
    </div>
  );
};
