import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogDetailPage } from "../Components/BlogDetailPage";
import { Skeleton } from "../Components/Skeleton";
import { AppBar } from "../Components/AppBar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  console.log(blog);

  if (loading) {
    return (
      <div>
        <AppBar />;
        <Skeleton />
      </div>
    );
  }
  return (
    <div>
      <BlogDetailPage blog={blog} />
    </div>
  );
};
