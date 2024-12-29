import z from "zod";

export const signupInput = z.object({
    username : z.string().email(),
    password : z.string().min(8),
    name : z.string().optional()

})

export type SignupInput = z.infer<typeof signupInput>

//Type inference is useful to ensure that your TypeScript types are in sync with your validation logic