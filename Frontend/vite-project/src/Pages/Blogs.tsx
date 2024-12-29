import { AppBar } from "../Components/AppBar";
import { BlogCard } from "../Components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "../Components/Skeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  return (
    <div>
      <AppBar />
      {loading ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-xl">
            {blogs.map((blog, id) => (
              <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"4 dec 2024"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
