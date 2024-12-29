import { Blog } from "../hooks";
import { AppBar } from "./AppBar";

export const BlogDetailPage = ({ blog }: { blog: Blog }) => {
  return (
    <div className="h-screen">
      <AppBar />
      <div className="md:flex w-full">
        <div className="flex w-full md:w-4/6">
          <div className="flex flex-col w-full md:mt-24 mt-20 gap-6">
            <div className="pl-10 md:pl-24 md:pr-24 pr-10 text-5xl font-bold">
              {blog.title}
            </div>
            <div className="pl-24 text-slate-600">
              Posted on August 25, 2024
            </div>
            <div className="pl-10 md:pl-24 pr-10 font-normal text-xl">
              {blog.content}
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-2/6">
          <div className="flex flex-col w-full md:mt-24 mt-20 gap-6 pl-10">
            <div>
                <div  className="font-medium">
                Author
                </div>
              
              <div className="font-bold text-2xl">{blog.author.name || "Anonymous"}</div>
              <div className="pt-0.5 text-slate-500 text-lg">
                Random catch phrase about the author's ability to grab the user's attention
                </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
