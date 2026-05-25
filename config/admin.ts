import type { Core } from '@strapi/strapi';
import type { UID } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env("CLIENT_URL")],
      async handler(
        uid, 
        { 
          documentId, 
          locale, 
          status 
        }: {
          documentId: string;
          locale?: string;
          status?: string;
      }) {
        if(uid === "api::blog-post.blog-post"){
          const document = await strapi.documents(uid).findOne({
            documentId,
            populate: null,
            fields: ["slug"],
          });
          const { slug } = document;
          const urlSearchParams = new URLSearchParams({
            secret: env("PREVIEW_SECRET"),
            ...(slug && { slug }),
            uid,
            status,
          });
          return `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
        }
      },
    },
  },
});

export default config;
