"use client"

import { Category } from "@/app/Components/Category/Category";
import { SearchByCriteria } from "@/app/Components/SearchByCriteria/SearchByCriteria";
import { useEffect, useState } from "react";
export default function Networking() {
    const [product,setproduct] = useState([]) ; 
                const [page,setpage] = useState(1) ;
                useEffect(()=>{
                    const data_product = async () =>{
                         // Lấy 7 trang (2,3,4,5,6,7,8) = 56 sản phẩm
                    const data = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/products/categories/networking`)
                    const json = await data.json();
                    setproduct(Array.isArray(json.products) ? json.products : []);
                        
                        
                    }
                    data_product() ; 
                },[])
            return (
                <>
                    <Category/>
                    <SearchByCriteria data_products={{ products: product as any[] }}/>
                    
                </>
            )
}