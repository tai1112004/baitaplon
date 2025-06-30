"use client"
import { SearchByCriteria } from '@/app/Components/SearchByCriteria/SearchByCriteria';
import {useState} from 'react';
import { useEffect } from 'react';
type data  = {
    _id: number ; 
    name:string ; 
    image:string ; 
    description:string ; 
    rating:number ; 
    price:number ; 
    countInStock:number ; 
    discount:number; 
    ram?:string ; 
    screen_size?:string ; 
    processor?:string ; 
    gpu_brand?:string ; 
    drive_size?:string ; 
    brand:number ; 
    category:number ; 
}
export default  function ProductPage() {
    const [product, setproduct] = useState<data[]>([]); 
    useEffect(() => {
  const data_product = async () => {
    const data = await fetch(`https://ecommerce-django-production-6256.up.railway.app/api/products`);
    const json = await data.json();
    setproduct(Array.isArray(json.products) ? json.products : []);// <-- lấy mảng sản phẩm
  };
  data_product();
  console.log(product) ; 
}, []);
    
    return (
        <>
             <SearchByCriteria data_products={{ products: product as data[] }} />
        </>
    )
} 