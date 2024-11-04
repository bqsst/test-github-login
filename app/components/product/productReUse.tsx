import Image from 'next/image';
import * as React from 'react';

interface IProductProps {
   image: string,
   title: string,
   author: string
}

const Product: React.FC<IProductProps> = (props) => {
   const { image, title, author } = props;

   return (
      <div className='flex flex-col cursor-pointer'>
         <Image src={image} alt='Product image' width={400} height={300} className='book-image hover:shadow-xl hover:shadow-slate-700'/>
         <h4 className='book-name'>{title}</h4>
         <p>{author}</p>
      </div>
   );
};

export default Product;