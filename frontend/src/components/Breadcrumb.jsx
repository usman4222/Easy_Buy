import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb " className='px-5 md:px-10 lg:px-20 py-5 '>
      <ol className="breadcrumb flex gap-3 border-b pb-5">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="breadcrumb-item" 
            style={{ color: index === items.length - 1 ? '#C8C4D3' : '#51545F' }}
          >
            {index < items.length - 1 ? (
              <a href="/" className='mr-2' style={{ color: '#51545F' }}>{item}</a> 
            ) : (
              <span>{item}</span>
            )}
            {index < items.length - 1 && <span> &gt; </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
