/**
 * pessoa controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
    "api::pessoa.pessoa",
    ({ strapi }) => ({
      async findOne(ctx) {
        const { id: documentId } = ctx.params;
  
        const pessoa = await strapi.documents("api::pessoa.pessoa").findOne({
          documentId: documentId,
          populate: ["cidade", "estado"],
        });
  
        if (!pessoa) {
          return ctx.notFound("Pessoa não encontrada.");
        }
  
        return pessoa;
      },
    })
);