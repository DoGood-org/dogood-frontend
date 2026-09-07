export const apiRoutes = {
  auth: {
    signup: '/auth/signup',
    login: '/auth/login',

    verifyEmail: (verificationCode: string) =>
      `/auth/verify-email/${verificationCode}`,

    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',
    resendVerification: '/auth/resend-verification',
    forgotPassword: '/auth/forgot-password',
    resetPassword: (resetPasswordToken: string) =>
      `/auth/reset-password/${resetPasswordToken}`,
    resentForgotPassword: '/auth/resent-forgot-password',
  },

  // current user proxy

  user: {
    current: '/auth/current-user',
    profileUpdate: '/user/profile',
    profileDelete: '/user/profile',
    settingsUpdate: '/user/settings',
    getById: (id: string | number) => `/user/profile/${id}`,
    usersByName: '/user/name',
  },

  donate: {
    getById: (id: string | number) => `/donate/${id}`,
    createCheckoutSession: '/create-checkout-session',
    webhook: '/webhook',
  },

  organizations: {
    signup: '/organization/signup',
    getById: (id: string | number) => `/organization/${id}`,
    update: (id: string | number) => `/organization/${id}`,
    delete: (id: string | number) => `/organization/${id}`,
    membersByOrg: (id: string | number) => `/organization/${id}/members`,

    getByName: '/organization',
    addMember: '/organization/members',
    deleteMember: '/organization/members',
    updateMemberRole: '/organization/members/role',
  },

  posts: {
    create: '/posts',
    getAll: (lang: string) => `/posts/${lang}`,
    getById: (id: string | number, lang: string) => `/posts/${id}/${lang}`,
    update: (id: string | number, lang: string) => `/posts/${id}/${lang}`,
    delete: (id: string | number) => `/posts/${id}`,
  },

  reviews: {
    createUserToUser: '/reviews/users',
    createUserToOrg: '/reviews/organizations',
    createUserToPlatform: '/reviews/platform',
    createTaskUserReview: (taskId: string | number) =>
      `/reviews/${taskId}/users`,
    getById: (id: string | number) => `/reviews/${id}`,
    update: (id: string | number) => `/reviews/${id}`,
    delete: (id: string | number) => `/reviews/${id}`,

    byUser: (id: string | number) => `/reviews/by-user/${id}`,
    getAllWithFilters: '/reviews/all',
  },

  contact: {
    send: '/contact',
  },

  joinRequests: {
    create: '/organization/join-request',
    getJoinRequests: (id: string) => `/organization/${id}/join-requests`,
    updateStatus: '/organization/join-request/status',
  },

  tasks: {
    list: '/task',
    listByUser: (userId: string) => `/task/${userId}`,
    create: '/task',
    getById: (id: string | number) => `/task/${id}`,
    update: (id: string | number) => `/task/${id}`,
    delete: (id: string | number) => `/task/${id}`,
    updateStatus: (id: string | number) => `/task/${id}/status`,
    search: '/task/search',
  },

  admin: {
    getAllOrg: '/admin/organizations',
  },
} as const;
