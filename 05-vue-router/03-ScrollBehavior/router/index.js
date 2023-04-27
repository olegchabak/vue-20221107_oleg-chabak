import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
          meta: {
            saveScrollPosition: true,
          },
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
          meta: {
            saveScrollPosition: true,
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) return false;
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: -30 };
    return { left: 0, top: 0 };
  },
});
