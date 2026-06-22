export type NotificationType =
  | 'join_organization'
  | 'task_completion'
  | 'review_confirmation'
  | 'review_canceling'
  | 'private'
  | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  text: string;
  isRead: boolean;
  createdAt: string;
  meta?: {
    organizationId?: string;
    organizationName?: string;
    taskId?: string;
    taskName?: string;
    reviewId?: string;
    revieweeName?: string;
    senderName?: string;
    link?: string;
  };
}
