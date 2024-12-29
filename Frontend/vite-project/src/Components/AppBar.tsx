import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
  const name = localStorage.getItem("name") || "";
  return (
    <div className="border-b flex justify-between py-4 px-10">
      <Link to={"/blogs"}>
        <div className="flex justify-center flex-col text-xl font-medium cursor-pointer">
          Medium
        </div>
      </Link>
      <Link to={"/publish"}>
        <div className="flex">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
          <div>
            <Avatar size={"big"} name={name} />
          </div>
        </div>
      </Link>
    </div>
  );
};
