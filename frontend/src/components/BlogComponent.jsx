import React from 'react'
import blog1 from '../assets/images/blog_1.jpg'
import blog2 from '../assets/images/blog_2.jpg'
import blog3 from '../assets/images/blog_3.jpg'

const BlogComponent = () => {
    return (
        <div className='flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0 md:px-10 lg:px-20 py-10'>
            <div className="relative w-full md:w-1/3 h-64 overflow-hidden rounded-lg shadow-lg group">
                <img
                    src={blog1}
                    alt="Card Image"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center px-10 md:px-4 lg:px-10 opacity-0 group-hover:opacity-90 transition duration-300">
                    <div className="text-center bg-[#F5F7F7] bg-opacity-90 p-5 rounded-lg">
                        <h3 className="text-lg md:text-xl text-[rgb(40,40,40)] font-semibold">Here are the trends I see coming this fall</h3>
                        <p className="text-sm text-[rgb(81,84,95)] font-normal mt-2">by admin | Dec 01, 2017</p>
                        <button className="mt-4 text-[rgb(254,124,127)] font-medium text-sm underline rounded-md">Read More</button>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:w-1/3 h-64 overflow-hidden rounded-lg shadow-lg group">
                <img
                    src={blog2}
                    alt="Card Image"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center px-10 md:px-4 lg:px-10 opacity-0 group-hover:opacity-90 transition duration-300">
                    <div className="text-center bg-[#F5F7F7] bg-opacity-90 p-5 rounded-lg">
                        <h3 className="text-lg md:text-xl text-[rgb(40,40,40)] font-semibold">Here are the trends I see coming this fall</h3>
                        <p className="text-sm text-[rgb(81,84,95)] font-normal mt-2">by admin | Dec 01, 2017</p>
                        <button className="mt-4 text-[rgb(254,124,127)] font-medium text-sm underline rounded-md">Read More</button>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:w-1/3 h-64 overflow-hidden rounded-lg shadow-lg group">
                <img
                    src={blog3}
                    alt="Card Image"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center px-10 md:px-4 lg:px-10 opacity-0 group-hover:opacity-90 transition duration-300">
                    <div className="text-center bg-[#F5F7F7] bg-opacity-90 p-5 rounded-lg">
                        <h3 className="text-lg md:text-xl text-[rgb(40,40,40)] font-semibold">Here are the trends I see coming this fall</h3>
                        <p className="text-sm text-[rgb(81,84,95)] font-normal mt-2">by admin | Dec 01, 2017</p>
                        <button className="mt-4 text-[rgb(254,124,127)] font-medium text-sm underline rounded-md">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogComponent
