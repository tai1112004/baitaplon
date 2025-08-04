"use client"
import { Products } from '@/app/Components/Products/Products';
import {useState} from 'react';
import { useEffect } from 'react';
import { generalApi } from '../../../../../lib/api';

type data = {
    id: number;
    name: string;
    quantity: string;
    description: string;
    color: string;
    price: number;
    discount:  number ; 
    RAM: string;
    screen?: string;
    gpu?:    string;
    cpu?:    string;
    driver_size?: string;
    count_camera?: string;
    resolution?:     string;
    sensor?:     string;
    capacity_battery?: string;
    operating_system?: string;
    connectivity?: string;
    audio_technical?: string;
    style?: string;
    time_battery?: string;
    delay?: string;
    support_stylus?: false,
    brand: string;
    categories : string ; 
    images : imageType[] ; 
}
type imageType = {
    id: number;
    image: string ; 
}

export default  function MobilePage() {
    const [product, setproduct] = useState<data[]>([]); 
    useEffect(() => {
  const data_product = async () => {
    const data = await fetch(`${generalApi}getProducts/categories/mobile`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ name: 'Audio' }) // Assuming you want to filter by audio category
    } );
    const json = await data.json();
    setproduct(Array.isArray(json) ? json : []);// <-- lấy mảng sản phẩm
  };
  data_product();
  console.log("tao dang ow day " +product) ; 
}, []);
    
    return (
        <>
             <Products data_products={{ products: product as data[] }} />
        </>
    )
} 