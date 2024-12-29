import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  id: number;
  title: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>({
    content: "",
    id: 0,
    title: "",
    author: {
      name: "",
    },
  });
  console.log(id);
  
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })

      .then((response) => {
        console.log(response.data);
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blog:", error);
      })
  }, [id]);

  return {
    loading,
    blog,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })

      .then((response) => {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
