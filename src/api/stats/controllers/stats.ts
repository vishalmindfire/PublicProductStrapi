const controls = {
  async userCount(ctx) {
    const count = await strapi.db
      .query('plugin::users-permissions.user')
      .count({
        where: {
          role: {
                name: 'Authenticated',
            },
        },
      });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newCount = await strapi.db
    .query('plugin::users-permissions.user')
    .count({
        where: {
        createdAt: {
            $gte: today,
        },
        },
    });

    ctx.body = {
      loginUserCount : count,
      newUserCount: newCount
    };
  },
};

export default controls;