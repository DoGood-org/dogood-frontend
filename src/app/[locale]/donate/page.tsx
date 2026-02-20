import CreateTaskPage from '@/components/tasks/createPage/CreateTaskPage';
import { OrganizationFromBack } from '@/types/tasks.type';
import React, { JSX } from 'react';

interface Props {
  organizations: OrganizationFromBack[];
  currentUserName: string;
}

const DonatePage = ({ organizations, currentUserName }: Props): JSX.Element => {
  return (
    <>
      <CreateTaskPage
        organizations={organizations}
        currentUserName={currentUserName}
      />
    </>
  );
};

export default DonatePage;
