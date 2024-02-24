import { object, string, TypeOf, z } from 'zod';

export const createPostSchema = object({
  body: object({
    title: string({}),
    category: string({}).email('Invalid email address'),
    content: string({}),
  }),
});

export const updatePostSchema = object({
  params: object({
    id: string({}),
  }),
  body: object({
    title: string({}),
    category: string({}).email('Invalid email address'),
    content: string({}),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
