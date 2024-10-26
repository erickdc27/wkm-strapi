/**
 * cidade controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
    "api::cidade.cidade",
    ({ strapi }) => ({
      async delete(ctx) {
        const { id: documentId } = ctx.params;
  
        const cidade = await strapi.documents("api::cidade.cidade").findOne({
          documentId: documentId,
        });
  
        if (!cidade) {
          return ctx.notFound("Cidade não encontrada.");
        }
  
        const pessoasCount = await strapi.db.query("api::pessoa.pessoa").count({
          where: { cidade: cidade.id },
        });
  
        if (pessoasCount > 0) {
          return ctx.badRequest(
            "Não é possível excluir uma cidade que possui pessoas associadas."
          );
        }
  
        await strapi.documents("api::cidade.cidade").delete({
          documentId: documentId,
        });
  
        return ctx.send(null, 204);
      },
    })
);