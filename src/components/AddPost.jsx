import React, { useEffect, useState } from "react";
import { postData } from "../services/PostApi";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const AddPostCard = ({ data, setData }) => {
  const [addData, setAddData] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ name: "", email: "", body: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-100">
      <form
        className="bg-white flex flex-col items-center justify-center gap-4 py-4 px-6 rounded-[8px] relative"
        onSubmit={handleFormSubmit}
      >
        <X size={20} className="absolute top-3 right-3" />
        <div className="input-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={addData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-[4px] py-2 pl-3 pr-[22px] text-[16px] leading-[26px] text-gray-500"
          />
        </div>
        <div className="input-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={addData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            className="border border-gray-300 rounded-[4px] py-2 pl-3 pr-[22px] text-[16px] leading-[26px] text-gray-500"
          />
        </div>
        <textarea
          id="text"
          placeholder="Add Body..."
          name="body"
          value={addData.body}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-[4px] py-2 pl-3 pr-[22px] text-[16px] leading-[26px] text-gray-500 mt-2"
        ></textarea>
        <div>
          <Link to="/">
            <button className="border border-white rounded-[4px] bg-[#17313E] py-2 px-[22px] text-[16px] leading-[26px] text-white">
              Back
            </button>
          </Link>
          <button
            className="border border-white rounded-[4px] bg-[#17313E] py-2 px-[22px] text-[16px] leading-[26px] text-white"
            type="submit"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostCard;
