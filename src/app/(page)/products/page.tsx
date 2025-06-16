"use client"
import { SearchByCriteria } from '@/app/Components/SearchByCriteria/SearchByCriteria';
import {useState} from 'react';
import { useEffect } from 'react';
export default  function ProductPage() {
    const [product, setproduct] = useState<any[]>([]); 
    const [page,setpage] = useState(1) ;
    useEffect(() => {
  const data_product = async () => {
    const data = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/products?page=${page}`);
    const json = await data.json();
    setproduct(Array.isArray(json.products) ? json.products : []);// <-- lấy mảng sản phẩm
  };
  data_product();
  console.log(product) ; 
}, [page]);
    
    return (
        <>
             <SearchByCriteria data_products={{ products: product as any[] }} />
        </>
    )
} 