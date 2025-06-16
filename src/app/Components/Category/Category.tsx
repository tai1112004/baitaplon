"use client"
import { CiMobile1 } from "react-icons/ci";

import { CiLaptop } from "react-icons/ci";
import { IoIosTabletLandscape } from "react-icons/io";
import { CiHeadphones } from "react-icons/ci";
import { PiWatch } from "react-icons/pi";
import { CiCamera } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {useState} from 'react';
import LoadingThreeDotsJumping from "../loading/loading";
import { useRouter } from "next/navigation";
export const Category = () => {
    const pathname = usePathname();

    const data =[
        {
            "id": 1,
            "name": "Mobile",
            "icon": <CiMobile1 className="w-[48px] h-[48px]  group-hover:text-[white]" /> , 
            "link": "/products/mobilePhones"
        },
        {
            "id": 2,
            "name": "Laptop",
            "icon": <CiLaptop className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/laptopAndComputer"
        },
        {
            "id": 3,
            "name": "Tablet",
            "icon": <IoIosTabletLandscape className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/tablets"
        },
        {
            "id": 4,
            "name": "Wearables",
            "icon": <PiWatch className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/wearables"
        },
        {
            "id": 5,
            "name": "Audio",
            "icon": <CiHeadphones className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/audio"
        },
        {
            "id": 6,
            "name": "Cameras",
            "icon": <CiCamera className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/cameras"
        },
        {
            "id": 7,
            "name": "Gaming",
            "icon": <FaGamepad className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/gaming"
        },
        {
            "id": 8,
            "name": "Networking",
            "icon": <FaNetworkWired className="w-[48px] h-[48px]  group-hover:text-[white]" />,
            "link": "/products/networking"
        }



    ]
    const router = useRouter() ; 
    const [loading,setLoading] = useState(false) ;
    const handleLoading = (link:string) =>{
        setLoading(true) ;
        setTimeout(()=>{
            router.push(link) ; 
        },1000) ; 
    }
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center  bg-opacity-70 backdrop-blur">
                    <LoadingThreeDotsJumping />
                </div>
            )}
            <div className="category flex  items-center w-[100%] mt-[40px] mb-[48px] gap-[16px] ml-[30px] justify-between">
                {
                    data.map((category, index) =>
                        <>
                        {
                            category.link === pathname ? (
                                <>
                                    <div className="item_category py-[8px]   w-[100px] h-[108px] rounded-[8px] link group" key={index}>
                                        <div  className="  flex flex-col items-center justify-center gap-[8px] text-white">
                                            {category.icon}
                                            <div className="name  text-[20px] font-[300] text-[white]">{category.name}</div>
                                        </div>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div className="item_category py-[8px]   w-[100px] h-[108px] rounded-[8px] category_item group" key={index} onClick ={()=>handleLoading(category.link)}>
                                        <div  className="flex flex-col items-center justify-center gap-[8px] text-black ">
                                            {category.icon}
                                            <div className="name text-[#444444] text-[20px] font-[300] group-hover:text-[white]">{category.name}</div>
                                        </div>
                                    </div>
                                </>
                            )
                        }                        
                            
                        </>
                    )
            }


                
            </div>
        </>
 
 
    )
}