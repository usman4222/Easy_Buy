import React from 'react'

const ProductAdditionalInfo = () => {
    return (
        <div className='px-5 md:px-10 lg:px-20'>
            <h2 className='text-primaryRed font-medium text-[24px] leading-[29px] uppercase underline py-10'>Additional Information</h2>
            <div className='pb-20'>
                <div className='flex items-center gap-5 py-2'>
                    <h6 className='uppercase text-customGray'>Color:</h6>
                    <h6 className='uppercase text-customGray'>Gold, Red</h6>
                </div>
                <div className='flex items-center gap-5 py-2'>
                    <h6 className='uppercase text-customGray'>Size:</h6>
                    <h6 className='uppercase text-customGray'>xl, 2xl</h6>
                </div>
            </div>
        </div>
    )
}

export default ProductAdditionalInfo
