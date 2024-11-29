import React from "react";
// import usersImage from "../assets/svg/users.svg";
// import plus from "../assets/svg/plus.svg";
// import edit from "../assets/svg/edit.svg";
// import del from "../assets/svg/Trash.svg";
// import search from "../assets/svg/search.svg";

const TodoList = () => {
  return (
    <div>
      <div className="p-4 rounded-lg w-[514px] h-[404px]  border border-gray-300  bg-white shadow-[0px_1px_3px_0px_#0051AF1A] px-3 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-montserrat text-lg font-semibold leading-6 ">To-Do List</h3>
          <button className="text-blue-500">
            <img src={plus} alt="" />
          </button>
        </div>
        <div className="relative mb-4">
          <img
            src={search}
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-[8px]"
          />
        </div>
        {[1, 2, 3].map((item) => (
          <div className="flex items-center justify-between">
            <div
              key={item}
              className="flex items-center justify-between text-white bg-[#1A55A5] w-[354px] h-[52px] p-3 rounded-lg mb-2"
            >
              <span>Today have to visit...</span>
            </div>
            <div>
              <button className="mr-2">
                <img src={edit} alt="edit" />
              </button>
              <button>
                <img src={del} alt="del" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
