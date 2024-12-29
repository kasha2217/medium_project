import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { SignupInput } from "@kanikasha/common-medium";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username:'',
    email:'',
    password:'',
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      console.log(
        response
      );
      
      const jwt = await response.data.token;
      const name = await response.data.name;
      console.log(jwt);
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("name", name);
      navigate("/blogs");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold font-serif">
            Create an account
          </div>
          <div className="text-xl text-slate-400 py-2">
            {type === "signup"
              ? "Already have an account? "
              : "Don't have an account?"}
            <Link
              className="underline"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
          {type === "signup" ? (
            <LabelledInput
              label="Username"
              placeholder="Jhon Doe"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            ></LabelledInput>
          ) : (
            ""
          )}

          <LabelledInput
            label="Email"
            placeholder="JhonDoe@gmail.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          ></LabelledInput>
          <LabelledInput
            label="Password"
            type={"password"}
            placeholder="ukdh35h53kh"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          ></LabelledInput>
          <button
            onClick={sendRequest}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          >
            {type === "signup" ? "Sign up" : "Sign in"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInput) {
  return (
    <div className="gap-6 mb-6 w-full">
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 text-black">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
