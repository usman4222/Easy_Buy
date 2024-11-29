"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

export default function DeleteConfirmationModal({
  heading,
  content,
  onConfirm,
}) {
  const [openDel, setOpenDel] = useState(true);

  return (
    <Dialog open={openDel} onClose={setOpenDel} className="relative z-50">
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
            <div className="bg-white rounded-full absolute top-[-15px] right-[-15px] w-[28px] h-[28px] flex items-center justify-center border-[0.7px] border-[#E2E8F0] shadow-[1.4px_2.8px_7px_0px_rgba(180,191,205,0.2)]">
              <button onClick={() => setOpenDel(false)}>
                <RxCross2/>
              </button>
            </div>
            <h3 className="font-montserrat text-base font-bold leading-6 text-[#4D515A] uppercase">
              {heading}
            </h3>

            <h6 class="font-montserrat text-sm font-normal leading-5 text-left text-[#1E293B] mt-5">
              {content}
            </h6>

            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3">
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  setOpenDel(false);
                }}
                className="inline-flex w-full justify-center rounded-md  from-[#A51A1A] to-[#940000] bg-[linear-gradient(90.6deg,#A51A1A_46.33%,#940000_99.99%)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Proceed
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpenDel(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
