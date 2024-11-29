"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";


export default function AddSectionFormModal() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform  rounded-lg bg-white p-7 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white rounded-full absolute top-[-15px] right-[-15px] w-[28px] h-[28px] flex items-center justify-center">
              <button onClick={() => setOpen(false)}>
                <RxCross2 />
              </button>
            </div>
            <h3 className="font-montserrat text-base font-bold leading-6 text-left text-[#4D515A] uppercase">
              Add Section
            </h3>

            <div className="my-5">
              <div className="flex flex-col space-y-2 mt-5">
                <label
                  htmlFor="sectionSelector"
                  className="font-montserrat text-sm font-medium leading-5 text-left text-[#344054]"
                >
                  Class Name
                </label>
                <select
                  id="sectionSelector"
                  className="p-2 border-2 border-[#B5BDC5] rounded-[4px] focus:outline-none focus:ring-[#B5BDC5] text-[#667085] font-montserrat text-sm font-normal leading-6"
                >
                  <option value="">Class Name</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
                  <option value="section3">Section 3</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label
                  htmlFor="sectionSelector"
                  className="font-montserrat text-sm font-medium leading-5 text-left text-[#344054]"
                >
                  Medium
                </label>
                <select
                  id="sectionSelector"
                  className="p-2 border-2 border-[#B5BDC5] rounded-[4px] focus:outline-none focus:ring-[#B5BDC5] text-[#667085] font-montserrat text-sm font-normal leading-6"
                >
                  <option value="">Medium</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
                  <option value="section3">Section 3</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label
                  htmlFor="sectionSelector"
                  className="font-montserrat text-sm font-medium leading-5 text-left text-[#344054]"
                >
                  Teacher Incharge
                </label>
                <select
                  id="sectionSelector"
                  className="p-2 border-2 border-[#B5BDC5] rounded-[4px] focus:outline-none focus:ring-[#B5BDC5] text-[#667085] font-montserrat text-sm font-normal leading-6"
                >
                  <option value="">Medium</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
                  <option value="section3">Section 3</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label
                  htmlFor="addClass"
                  className="font-montserrat text-sm font-medium leading-5 text-left text-[#344054]"
                >
                  Section name
                </label>
                <input
                  id="addClass"
                  type="text"
                  placeholder="Section name"
                  className="p-2 border-2 border-[#B5BDC5] rounded-[4px] focus:outline-none focus:ring-[#B5BDC5] text-[#667085] font-montserrat text-sm font-normal leading-6"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label
                  htmlFor="addClass"
                  className="font-montserrat text-sm font-medium leading-5 text-left text-[#344054]"
                >
                  Description
                </label>
                <textarea
                  id="addClass"
                  type="text"
                  placeholder="Description"
                  className="p-2 pb-10 border-2 border-[#B5BDC5] rounded-[4px] focus:outline-none focus:ring-[#B5BDC5] text-[#667085] font-montserrat text-sm font-normal leading-6"
                />
              </div>
            </div>

            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md  from-[#1A55A5] via-[#1A55A5] to-[#003F94] bg-[linear-gradient(90.6deg,#1A55A5_46.33%,#003F94_99.99%)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
