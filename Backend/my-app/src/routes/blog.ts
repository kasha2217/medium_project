import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Context } from "hono/jsx";
import { sign, verify } from "hono/jwt";
import { createBlog, updateBlogInput } from "@kanikasha/common-medium";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: String;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  // console.log(c.req);
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const token = authHeader?.split(" ")[1];
  console.log(token);

  const res = await verify(token, c.env.JWT_SECRET);
  if (!res.id) {
    c.status(403);
    return c.json({ error: "User not found" });
  } else {
    c.set("userId", res.id.toString());
    await next();
  }
});

blogRouter.post("/createBlog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log(body);
  const bodyValidation = createBlog.safeParse(body);
  if (!bodyValidation.success) {
    c.status(400);
    return c.json({ error: bodyValidation.error });
  } else {
    const userId = c.get("userId");
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId.toString(),
      },
    });
    return c.json({
      msg: "Blog posted",
      id: post.id,
    });
  }
});

blogRouter.put("/editBlog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const bodyValidation = updateBlogInput.safeParse(body);
  if (!bodyValidation.success) {
    c.status(400);
    return c.json({ error: bodyValidation.error });
  } else {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      blog: post,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({ blogs: blogs });
});

blogRouter.get("/getBlog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  console.log(id);

  const getBlog = await prisma.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id:true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({blog: getBlog});
});
