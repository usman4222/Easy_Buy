
import React from 'react';

const TableDropdownMenu = ({ visible, onEdit, onDelete }) => {
  if (!visible) return null; 

  return (
    <div className="absolute left-0 top-0 ml-4 shadow-lg rounded-md overflow-hidden">
      <ul className="bg-white text-gray-700 rounded-[9px] shadow-[4px_4px_16px_rgba(0,0,0,0.10)] p-2">
        <li
          className="py-1 px-3 cursor-pointer hover:bg-gray-100"
          onClick={onEdit}
        >
          View
        </li>
        <li
          className="py-1 px-3 cursor-pointer text-[#F43F5E] hover:bg-gray-100"
          onClick={onDelete}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default TableDropdownMenu;
