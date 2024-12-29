import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().optional(),
});

//Type inference is useful to ensure that your TypeScript types are in sync with your validation logic

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

export type updateBlogInput = z.infer<typeof updateBlogInput>;
export type SignupInput = z.infer<typeof signupInput>;
export type createBlog = z.infer<typeof createBlog>;
export type SigninInput = z.infer<typeof signinInput>;
