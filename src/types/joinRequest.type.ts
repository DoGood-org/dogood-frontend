import { UserProfileProps } from './accountType';

// export type JoinRequestStatus =
//   | 'PENDING'
//   | 'ACCEPTED'
//   | 'REJECTED'
//   | 'CANCELLED';

export enum JoinRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export type DirectionRequest = 'FROM_USER' | 'FROM_ORGANIZATION';

export interface IJoinRequestApiData {
  // senderId: string | number;
  receiverOrganizationId: string;
  receiverUserId?: string;
  direction?: DirectionRequest;
  // status?: JoinRequestStatus;
}

export interface IJoinRequestResponse {
  status: string;
  code: string;
  message: string;
  data: {
    joinRequests: IJoinRequests[];
  };
}

export interface ICreateJoinRequestResponse {
  status: string;
  code: string;
  message: string;
  data: {
    joinRequest: IJoinRequests; // 👈 один об'єкт
  };
}

export interface IJoinRequests {
  id: string;
  status?: JoinRequestStatus;
  direction: DirectionRequest;
  sender: ISender;
  senderOrganization?: ISenderOrg;
}

export interface ISender {
  id: string;
  email: string;
  name: string;
  profile?: UserProfileProps;
}

export interface ISenderOrg {
  id: string;
  name: string;
}
