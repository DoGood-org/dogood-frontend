import React from 'react';

import CreateTaskPage from '@/components/tasks/createPage/CreateTaskPage';
import {
  MOCK_CURRENT_USER,
  MOCK_ORGANIZATIONS,
} from '@/components/main/map/mockTasks';

const DonatePage: React.FC = () => {
  return (
    <CreateTaskPage
      initialUser={MOCK_CURRENT_USER}
      initialOrganizations={MOCK_ORGANIZATIONS}
    />
  );
};

export default DonatePage;
