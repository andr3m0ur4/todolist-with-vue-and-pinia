export const routes = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('../views/TasksView.vue')
  },
  {
    path: '/projetos',
    component: () => import('../views/ProjectsView.vue'),
    children: [
      {
        path: '',
        name: 'Projetos',
        component: () => import('../views/Projects/ListProject.vue')
      },
      {
        path: 'novo',
        name: 'Novo projeto',
        component: () => import('../views/Projects/FormProject.vue')
      },
      {
        path: ':id',
        name: 'Editar projeto',
        component: () => import('../views/Projects/FormProject.vue'),
        props: true
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
];
