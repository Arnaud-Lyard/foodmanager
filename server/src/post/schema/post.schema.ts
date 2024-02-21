import { object, string, TypeOf, z } from 'zod';

export const createPostSchema = object({
  body: object({
    title: string({}),
    category: string({}).email('Invalid email address'),
    content: string({}),
  }),
});

export type createPostInput = TypeOf<typeof createPostSchema>['body'];
