import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@kanikasha/common-medium";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  const bodyValidation = signupInput.safeParse(body);

  if (!bodyValidation.success) {
    c.status(411);
    return c.json({ error: bodyValidation.error });
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.username,
        },
      });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(jwt);
      return c.json({
        token: jwt,
        name:user.name,
        msg: "Successfully signed In!",
      });
    } catch (e) {
      c.status(403);
      return c.json({ error: e });
    }
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const bodyValidation = signinInput.safeParse(body);
  if (!bodyValidation.success) {
    c.status(411);
    return c.json({ error: bodyValidation.error });
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found!" });
      }
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        token: jwt,
        name: user.name,
        msg: "Successfully signed In!",
      });
    } catch (e) {
      c.status(403);
      return c.json({ error: e });
    }
  }
});
