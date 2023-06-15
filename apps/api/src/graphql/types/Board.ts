import { objectType } from 'nexus';
import { User } from '@/graphql/types/User';

export const Board = objectType({
    name: 'Board',
    definition(t) {
        t.nonNull.string('id');
        t.string('name');
        t.field('owner', { type: User });
        t.list.field('users', {
            type: User,
            resolve(parent, args, ctx) {
                return ctx.prisma.board.findUnique({
                    where: {
                        id: parent.id
                    }
                }).users();
            }
        });
    }
});