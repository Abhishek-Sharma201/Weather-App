"use client";
import React, { useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const page = () => {
  const Router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    fName: "",
    lName: "",
  });

  const handleData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendToast = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.info("Done!");
    setTimeout(() => {
      Router.push("/");
    }, 2000);
  };

  return (
    <div className="w-full h-[100dvh] bg-black flex flex-col items-center justify-center gap-4">
      <ToastContainer />
      <h1 className="text-white font-[500] text-[2.5rem]">
        WeatherPulse<sup>{">>"}</sup>
      </h1>
      <form
        onSubmit={sendToast}
        className="w-[max-content] h-[max-content] bg-zinc-950 flex flex-col items-start justify-center rounded-[8px] gap-3 shadow-xl p-6"
      >
        <div className="w-[max-content] h-[max-content] flex flex-col items-start justify-around gap-2">
          <label htmlFor="email" className="font-[500] text-[.9rem] text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleData}
            className="w-[320px] h-[6dvh] rounded px-2 py-1 text-[.9rem] font-[500] outline-none text-white border bg-zinc-900 border-zinc-800"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="w-[max-content] h-[max-content] flex flex-col items-start justify-around gap-2">
          <label
            htmlFor="password"
            className="font-[500] text-[.9rem] text-white"
          >
            Message
          </label>
          <input
            type="text"
            name="message"
            id="password"
            value={formData.message}
            onChange={handleData}
            className="w-[320px] h-[6dvh] rounded px-2 py-1 text-[.9rem] font-[500] outline-none text-white border bg-zinc-900 border-zinc-800"
            placeholder="Message"
            required
          />
        </div>
        <div className="w-full h-[max-content] flex items-center justify-between">
          <div className="w-[max-content] h-[max-content] flex flex-col items-start justify-around gap-2">
            <label
              htmlFor="firstName"
              className="font-[500] text-[.9rem] text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="fName"
              id="firstName"
              value={formData.fName}
              onChange={handleData}
              className="w-[150px] h-[6dvh] rounded px-2 py-1 text-[.9rem] font-[500] outline-none text-white border bg-zinc-900 border-zinc-800"
              placeholder="John"
              required
            />
          </div>
          <div className="w-[max-content] h-[max-content] flex flex-col items-start justify-around gap-2">
            <label
              htmlFor="lastName"
              className="font-[500] text-[.9rem] text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lName"
              id="lastName"
              value={formData.lName}
              onChange={handleData}
              className="w-[150px] h-[6dvh] rounded px-2 py-1 text-[.9rem] font-[500] outline-none text-white border bg-zinc-900 border-zinc-800"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <button
          className="w-full h-[7dvh] p-2 bg-blue-500 text-white font-[500] rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
