"use client"
import { CategorySanPham } from '@/app/Components/CategorySanpham/CategorySanPham';
import { SearchByCriteria } from '@/app/Components/SearchByCriteria/SearchByCriteria';
import {useState} from 'react';
import { useEffect } from 'react';
export default  function ProductPage() {
    const [product,setproduct] = useState([]) ; 
    const [page,setpage] = useState(1) ;
    useEffect(()=>{
        const data_product = async () =>{
             // Lấy 7 trang (2,3,4,5,6,7,8) = 56 sản phẩm
        const data = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/products?page=${page}`)
        setproduct(await data.json()) ; 
            
            
        }
        data_product() ; 
    },[])
    
    return (
        <>
             <SearchByCriteria data_products={product as any[]} />
        </>
    )
} 