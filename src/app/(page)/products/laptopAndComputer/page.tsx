"use client";
import { Category } from "@/app/Components/Category/Category";
import { SearchByCriteria } from "@/app/Components/SearchByCriteria/SearchByCriteria";
import { useEffect } from "react";
import { useState } from "react";
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
export default function LaptopAndComputer() {
    const [product,setproduct] = useState<data[]>([]) ; 
        useEffect(()=>{
            const data_product = async () =>{
                 // Lấy 7 trang (2,3,4,5,6,7,8) = 56 sản phẩm
            const data = await fetch(`https://ecommerce-django-production-6256.up.railway.app/api/products/categories/Laptop`)
            const json = await data.json();
        setproduct(Array.isArray(json.products) ? json.products : []);
                
                
            }
            data_product() ; 
        },[])
    return (
        <>
            <Category/>
            <SearchByCriteria data_products={{ products: product as data[] }}/>
            
        </>
    )
}