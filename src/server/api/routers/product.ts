import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.product.findMany();
    }),
    create: protectedProcedure
    .input(z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          quantity: input.quantity,
          price: input.price,
          createdBy: { connect: { id: ctx.session!.user.id } },
        },
      });
    }),
});
