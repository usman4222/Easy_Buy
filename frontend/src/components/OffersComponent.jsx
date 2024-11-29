import React from 'react';
import { MdLocalShipping } from "react-icons/md";
import { RiCashFill, RiArrowGoBackLine } from "react-icons/ri";
import { ImClock } from "react-icons/im";

const OffersComponent = () => {
    return (
        <div className='px-4 md:px-10 lg:px-20 mb-10'>
            <div className='bg-[#f3f3f3] px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
                <div className='flex items-center gap-4'>
                    <MdLocalShipping className='text-primaryRed text-3xl' />
                    <div>
                        <h4 className='uppercase font-medium text-[14px] leading-[18px] text-[rgb(40,40,40)]'>
                            Free Shipping
                        </h4>
                        <p className='font-medium text-[12px] leading-[18px] text-[rgb(81,84,95)]'>
                            Suffered Alteration in Some Form
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <RiCashFill className='text-primaryRed text-3xl' />
                    <div>
                        <h4 className='uppercase font-medium text-[14px] leading-[18px] text-[rgb(40,40,40)]'>
                            Cash on Delivery
                        </h4>
                        <p className='font-medium text-[12px] leading-[18px] text-[rgb(81,84,95)]'>
                            The Internet Tend To Repeat
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <RiArrowGoBackLine className='text-primaryRed text-3xl' />
                    <div>
                        <h4 className='uppercase font-medium text-[14px] leading-[18px] text-[rgb(40,40,40)]'>
                            45 Days Return
                        </h4>
                        <p className='font-medium text-[12px] leading-[18px] text-[rgb(81,84,95)]'>
                            Making it Look Like Readable
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <ImClock className='text-primaryRed text-3xl' />
                    <div>
                        <h4 className='uppercase font-medium text-[14px] leading-[18px] text-[rgb(40,40,40)]'>
                            Opening All Week
                        </h4>
                        <p className='font-medium text-[12px] leading-[18px] text-[rgb(81,84,95)]'>
                            8AM - 09PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OffersComponent;
