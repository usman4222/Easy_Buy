import React from "react";

const FinanceCard = () => {
  return (
    <div className="w-[514px] h-[435px] p-[18px] gap-[20px] rounded-[10px] border border-gray-300  bg-white shadow-[0px_1px_3px_0px_#0051AF1A] ">
      <div className="flex justify-between">
        <div className="mt-4">
          <h4 className="text-[#1E293B] font-montserrat text-lg font-semibold leading-6 ">
            Finance
          </h4>
        </div>
        <div className="mt-4">
          <select className="border border-blue-500 rounded-md p-2 text-left">
            <option value="">Select Year</option>
            {[2020, 2021, 2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      {[
        {
          label: "Total Revenue",
          value: "Rs. 6,85,258",
          color: "bg-[#10B981]",
        },
        {
          label: "Received Amount",
          value: "Rs. 2,85,258",
          color: "bg-[#F7B84B]",
        },
        { label: "Due Amount", value: "Rs. 6,85,258", color: "bg-[#726BEA]" },
        { label: "Expenses", value: "Rs. 6,65,258", color: "bg-[#64748B]" },
      ].map(({ label, value, color }) => (
        <div key={label} className="">
          <div className="flex justify-between text-sm ">
            <span className="text-[#4E5564] font-montserrat text-base font-semibold leading-5 ">{label}</span>
          </div>
          <div className="flex items-center ">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`${color} h-2.5 rounded-full w-3/4`}></div>
            </div>
            <span className="text-[#4E5564] font-montserrat text-base font-semibold leading-5 ">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceCard;
