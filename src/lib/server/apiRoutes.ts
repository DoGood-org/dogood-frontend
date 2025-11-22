// lib/apiRoutes.ts

// - `/auth/*` → rewrites to `/api/auth/*`
// - `/proxy/*` → rewrites to `/api/proxy/*` → backend

export const apiRoutes = {
  auth: {
    signup: '/signup',
    login: '/login',

    verifyEmail: (verificationCode: string) =>
      `/auth/verify-email/${verificationCode}`,

    resendVerification: '/auth/resend-verification',

    refreshToken: '/auth/refresh-token',

    forgotPassword: '/auth/forgot-password',

    resetPassword: (resetPasswordToken: string) =>
      `/auth/reset-password/${resetPasswordToken}`,

    resentForgotPassword: '/auth/resent-forgot-password',
  },

  // current user proxy (protected)

  user: {
    logout: '/proxy/auth/logout',
    current: '/proxy/auth/current-user',
    profileUpdate: '/proxy/user/profile',
    profileDelete: '/proxy/user/profile',
    settingsUpdate: '/proxy/user/settings',
  },

  donate: {
    getById: (id: string | number) => `/proxy/donate/${id}`,
    createCheckoutSession: '/proxy/create-checkout-session',
    webhook: '/proxy/webhook',
  },

  organizations: {
    signup: '/proxy/organization/signup',
    update: (id: string | number) => `/proxy/organization/${id}`,
    delete: (id: string | number) => `/proxy/organization/${id}`,

    membersByOrg: (id: string | number) => `/proxy/organization/${id}/members`,

    addMember: '/proxy/organization/members',
    deleteMember: '/proxy/organization/members',
    updateMemberRole: '/proxy/organization/members/role',
  },

  posts: {
    create: '/proxy/posts',
    getAll: (lang: string) => `/proxy/posts/${lang}`,
    getById: (id: string | number, lang: string) =>
      `/proxy/posts/${id}/${lang}`,
    update: (id: string | number, lang: string) => `/proxy/posts/${id}/${lang}`,
    delete: (id: string | number) => `/proxy/posts/${id}`,
  },

  reviews: {
    createUserToUser: '/proxy/reviews/users',
    createUserToOrg: '/proxy/reviews/organizations',
    createUserToPlatform: '/proxy/reviews/platform',
    createTaskUserReview: (taskId: string | number) =>
      `/proxy/reviews/${taskId}/users`,

    getById: (id: string | number) => `/proxy/reviews/${id}`,
    update: (id: string | number) => `/proxy/reviews/${id}`,
    delete: (id: string | number) => `/proxy/reviews/${id}`,

    byUser: (id: string | number) => `/proxy/reviews/by-user/${id}`,
    getAllWithFilters: '/proxy/reviews/all',
  },

  contact: {
    send: '/proxy/contact',
  },

  joinRequests: {
    create: '/proxy/organization/join-request',
    updateStatus: '/proxy/organization/join-request/status',
  },

  tasks: {
    list: '/proxy/task',
    create: '/proxy/task',
    getById: (id: string | number) => `/proxy/task/${id}`,
    update: (id: string | number) => `/proxy/task/${id}`,
    delete: (id: string | number) => `/proxy/task/${id}`,
    updateStatus: (id: string | number) => `/proxy/task/${id}/status`,
    search: '/proxy/task/search',
  },
} as const;
