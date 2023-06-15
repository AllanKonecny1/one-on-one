import '../services/prisma';

export const resolvers = {
  Query: {
    // TODO: Correct types
    users: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.user.findMany()
  }
};
