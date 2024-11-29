import React from "react";

const AttendanceCard = () => {
  return (
    <div className="w-[1090px] h-[241px] p-[18px] gap-[10px] rounded-[10px] bg-white border border-gray-200 shadow-[0px_1px_3px_0px_#0051AF1A]">
      <div className="flex justify-between">
        <div>
          <h4 className="font-montserrat text-[20px] font-semibold leading-[24px] text-left">
            Attendnace
          </h4>
        </div>
        <div>
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
      <div className=" flex  justify-between py-[18px]">
        <div className="flex w-[341.33px] h-[122px] flex-col p-[18px] gap-[10px] rounded-[10px]">
          <h5 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
            Present
          </h5>
          <h6 className="text-[#1E293B] font-montserrat text-[24px] font-medium leading-[36px] text-center">
            8976
          </h6>
        </div>
        <div className="w-[1px] bg-[#E2E8F0] h-[120px] gap-0 "></div>
        <div div className="flex flex-col  w-[341.33px] h-[122px] pt-[18px] gap-[10px] rounded-[10px]">
          <h5 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
            Present
          </h5>
          <h6 className="text-[#1E293B] font-montserrat text-[24px] font-medium leading-[36px] text-center">
            8976
          </h6>
        </div>
        <div className="w-[1px] bg-[#E2E8F0] h-[120px] gap-0 "></div>
        <div className="flex flex-col w-[341.33px] h-[122px] pt-[18px] gap-[10px] rounded-[10px]">
          <h5 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
            Present
          </h5>
          <h6 className="text-[#1E293B] font-montserrat text-[24px] font-medium leading-[36px] text-center">
            8976
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
