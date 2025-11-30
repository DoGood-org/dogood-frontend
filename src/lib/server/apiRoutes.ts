// lib/apiRoutes.ts
// - `/auth/*` → rewrites to `/api/auth/*`
// - `/proxy/*` → rewrites to `/api/proxy/*` → backend

export const apiRoutes = {
  auth: {
    signup: '/signup',
    login: '/login',

    verifyEmail: (verificationCode: string) =>
      `/verify-email/${verificationCode}`,

    refreshToken: '/refresh-token',
    logout: '/logout',
    resendVerification: '/resend-verification',
    forgotPassword: '/forgot-password',
    resetPassword: (resetPasswordToken: string) =>
      `/reset-password/${resetPasswordToken}`,
    resentForgotPassword: '/resent-forgot-password',
  },

  // current user proxy

  user: {
    current: '/auth/current-user',
    profileUpdate: '/user/profile',
    profileDelete: '/user/profile',
    settingsUpdate: '/user/settings',
  },

  donate: {
    getById: (id: string | number) => `/donate/${id}`,
    createCheckoutSession: '/create-checkout-session',
    webhook: '/webhook',
  },

  organizations: {
    signup: '/organization/signup',
    update: (id: string | number) => `/organization/${id}`,
    delete: (id: string | number) => `/organization/${id}`,

    membersByOrg: (id: string | number) => `/organization/${id}/members`,

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
    updateStatus: '/organization/join-request/status',
  },

  tasks: {
    list: '/task',
    create: '/task',
    getById: (id: string | number) => `/task/${id}`,
    update: (id: string | number) => `/task/${id}`,
    delete: (id: string | number) => `/task/${id}`,
    updateStatus: (id: string | number) => `/task/${id}/status`,
    search: '/task/search',
  },
} as const;
