import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Board } from './Board';

export const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.string('id');
        t.string('name');
        t.string('email');
        t.list.field('boards', {
            type: Board,
            resolve(parent, args, ctx) {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: parent.id
                    }
                }).boards();
            }
        });
    }
});

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('users', {
            type: User,
            resolve(parent, args, ctx) {
                return ctx.prisma.user.findMany();
            }
        });
    }
});

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createUser', {
            type: User,
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg())
            },
            resolve(parent, args, ctx) {
                return ctx.prisma.user.create({
                    data: {
                        name: args.name,
                        email: args.email
                    }
                });
            }
        });
    }
});