import axios from "axios";
import { AppBar } from "../Components/AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full">
        <div className="block max-w-screen-lg w-full pt-6">
          <textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="p-2.5 w-full text-sm text-gray-900 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
          ></textarea>
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/createBlog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization:'bearer ' +  localStorage.getItem("jwt"),
                  },
                }
              );
              console.log(response.data);
              
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 rounded-md py-2"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="mb-4 w-full border rounded-md ">
        <div className="flex items-center justify-between">
          <div className="py-2 bg-white rounded-b-lg w-full">
            <textarea
              onChange={onChange}
              rows={8}
              className="focus:outline-none px-2 block w-full text-sm text-gray-800 bg-white border-0"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
}
