import { Link } from "react-router-dom";

interface Blogcardprops {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: Blogcardprops) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4">
        <div className="flex">
          <div className="flex justify center flex-col">
            <Avatar name={authorName} size={"small"} />
          </div>
          <div className="flex justify-center font-extralight flex pl-2 text-sm">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="flex justify-center font-thin pl-2 text-slate-400 text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin text-slate-400">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm text-slate-500 font-thin pt-4">{`${
          Math.ceil(content.length) / 100
        } minutes(s)`}</div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10 "
      }`}
    >
      <span className="font-xs font-thin text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
}
