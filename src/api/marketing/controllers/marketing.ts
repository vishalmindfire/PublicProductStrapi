/**
 * marketing controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::marketing.marketing', ({ strapi }) => ({
    async count(ctx) {
      const { query } = ctx.request;
      const count = await strapi
        .documents(
          'api::marketing.marketing'
        )
        .count(query);

      ctx.body = {
        count,
      };
    },
  }));
