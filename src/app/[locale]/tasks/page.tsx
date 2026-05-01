import {
  MOCK_CURRENT_USER,
  MOCK_ORGANIZATIONS,
} from '@/components/main/map/mockTasks';
import CreateTaskPage from '@/components/tasks/createTaskPage/CreateTaskPage';

const TaskPage: React.FC = () => {
  return (
    <div>
      <CreateTaskPage
        initialUser={MOCK_CURRENT_USER}
        initialOrganizations={MOCK_ORGANIZATIONS}
      />
    </div>
  );
};

export default TaskPage;
