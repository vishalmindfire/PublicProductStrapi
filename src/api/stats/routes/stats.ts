const routes ={
  routes: [
    {
      method: 'GET',
      path: '/stats/users/count',
      handler: 'stats.userCount',
      config: {
        auth: false,
      },
    },
  ],
};

export default routes;