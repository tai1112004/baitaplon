"use client"
import Link from "next/link"
import { CiSearch } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { Search } from "./search/search";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LoadingThreeDotsJumping from "../loading/loading";
import { useEffect } from "react";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
import { LoadingPage } from "../notification/loading";

type UserProfile = {
    username?: string;
    // add other properties if needed
};

export const Header = () => {
    const [search, setSearch] = useState(false);
    const [loading, setloading] = useState(false);
    const [islogin,setlogin]=useState(false) ; 
    const [data,setdata] = useState<UserProfile>({});
    const [count_cart,setCount] = useState(0) ; 
    const pathname = usePathname() ; 
    const router = useRouter() ; 
    const handleSearchTogle = () => {
       setSearch(!search) ; 
    }
    const[token, settoken]= useState(getCookie("token")) ;
   
    useEffect(()=>{
        if(token){
            setlogin(true) ;
            const information = async () =>
            {
                const respose = await fetch("https://ecommerce-django-production-7581.up.railway.app/api/users/profile", {
                    method: "POST" , 
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization':`Bearer ${token}` , 
                    },

                })
                setdata(await respose.json()) ; 
            }
            information() ; 
        }
        else setlogin(false) ; 

    },[token]) ; 
    useEffect(()=>{
        if(token)
        {
            const handleCartUpdate =() =>{
                const cart = async() =>{
                const res = await fetch("https://ecommerce-django-production-7581.up.railway.app/api/orders/cart/",{
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json",
                        'Authorization':`Bearer ${token}` ,
                    }
                })
                const data_cart = await res.json() ;
                if(data_cart) setCount(data_cart.length) ; 
            }
            cart()  ; 
            }
            handleCartUpdate() ;
        }
        
        
    },[token,count_cart])
    const handleSubmit= (e:any) =>{
        e.preventDefault();
        console.log("đã chạy vào đây");
        console.log(e.target.thongtin.value);
    }
    const handleClick_User = ()=>{
         
        if(!token)
        {
            setloading(true)
            setTimeout(() => {
                router.push("/authentication") ;
            }, 2000);
            
        }
        else 
        {
            const infor = document.getElementsByClassName("menu_user") ; 
            if(infor)
            {
                infor[0].classList.toggle("hidden") ;
            }
        }
     }
    const handleClick_tranferPage=useCallback((link:string)=>{
        if(link==="/cart" && !token)
        {
            setloading(true)
            setTimeout(() => {
                router.push("/authentication") ; 
            }, 2000);
        }
        if(link !=pathname) 
        {
            setloading(true) ;
            setTimeout(() => {
            router.push(link) ;
            
        }, 1000);
            
        }
        
     },[pathname, router])
    useEffect(()=>{
        setloading(false) ; 
    },[pathname])
         
        
    
    return (
        <>
        {loading && (
            <LoadingPage/>
        )}
            <header className="fixed top-0 left-0 z-[9999] w-[100%]  border-b-[1px] border-[#B4B4B4] bg-white  ">
                <div className="contaner mx-auto my-0 w-[1440px] relative">
                <div className="inner_wrap flex flex-row justify-between items-center  bg-white">
                    <div className="logo my-[19px] w-[56px] h-[63px]">
                        <Link rel="stylesheet" href="/" className="w-[56px] h-[63px]">
                            <img src="/image/Header/Desktop/logo.png" alt="logo" className="w-[56px] h-[63px]" />
                        </Link>
                    </div>
                    <div >
                        <ul className="menu flex gap-[100px] my-[23px] py-[23px]">
                            <li className=" size-[18px] font-[300] text-black ">
                                <Link rel="stylesheet" href="/" className="link_header">Home </Link>
                                </li>
                           <li className="size-[18px] font-[300] text-black link_header group relative z-10">
                                <div rel="stylesheet" className="" onClick={()=>handleClick_tranferPage("/products")}>
                                    Products
                                </div>
                                <ul className="list invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bg-white rounded-xl left-[-50px] text-[16px] font-[300] text-black pt-4 z-20 w-[300px] shadow-lg border border-t-0 border-gray-200 transition-all duration-300 ease-in-out flex-col gap-1 top-[calc(100%+20px)]">
                                    {[
                                    { href: "/products/mobilePhones", label: "Mobile Phones" },
                                    { href: "/products/laptopAndComputer", label: "Laptops & Computers" },
                                    { href: "/products/tablets", label: "Tablets & E-reader" },
                                    { href: "/products/wearables", label: "Wearables" },
                                    { href: "/products/audio", label: "Audio" },
                                    { href: "/products/cameras", label: "Cameras" },
                                    { href: "/products/gaming", label: "Gaming" },
                                    { href: "/products/networking", label: "Networking" },
                                    ].map((item) => (
                                    <div id={item.href} key={item.href} onClick={()=>handleClick_tranferPage(item.href)}>
                                        <li className="list_danhmuc px-5 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                        {item.label}
                                        </li>
                                    </div>
                                    ))}
                                </ul>
                                </li>

                            <li className=" size-[18px] font-[300] text-black" >
                                <div rel="stylesheet" className="link_header" onClick={()=>handleClick_tranferPage("/blog")}>Blog 
                                </div>
                                </li>
                            <li className=" size-[18px] font-[300] text-black">
                                <div rel="stylesheet" className="link_header" onClick={()=>handleClick_tranferPage("/FAQ")}>FAQ </div>
                                </li>
                            <li className=" size-[18px] font-[300] text-black">
                                <div rel="stylesheet"  className="link_header" onClick={()=>handleClick_tranferPage("contactUS")}>ContactUS </div>
                                </li>
                            
                        </ul>
                    </div>
                    
                    
                    <div className="function flex gap-[40px] my-[23px] py-[23px] ">
                        <button className="search link_header" onClick={handleSearchTogle} title="Search"><CiSearch  className="w-[24px] h-[24px]"/></button>
                        <div 
                                onClick={()=>handleClick_tranferPage("/cart")}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 relative"
                                title="Shopping Cart"
                            >
                                <CiShoppingBasket className="w-6 h-6" />
                                {/* Cart badge - you can add item count here */}
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {count_cart}
                                </span>
                            </div>
                        
                        <button className="user link_header" title="User Account" onClick={handleClick_User}>
                            {
                                islogin ? (
                                       <CiUser className="w-[24px] h-[24px]" />
                                ) : (
                                    <>
                                    <FaUserPlus className="w-[24px] h-[24px]   "/> 
                                        
                                    </>
                                    
                                )

                            }
                            
                            {
                                islogin && (
                                    <>
                                        <div className="menu_user fixed top-[133px] right-[50px] h-[288px] w-[273] bg-white  rounded-[8px] hidden">
                                            <ul className="flex flex-col gap-[24px] p-[16px]">
                                                <li className="flex gap-[16px] hover:bg-blue-50  transition-colors cursor-pointer p-[5px] " onClick={()=>{
                                                    setloading(true) ; 
                                                    setTimeout(() => {
                                                        router.push("/account/persional")
                                                    }, 1000);
                                                }}>
                                                    <div className="icon"><FaRegCircleUser className="w-[24px] h-[24px] text-[#0C0C0C]"/></div>
                                                    <div className="information text-[18px] text-[#0C0C0C] font-[300] hover:text-[#0C68F4]">{data.username}</div>
                                                </li>
                                                <li  className="flex gap-[16px]  hover:bg-blue-50  transition-colors cursor-pointer p-[5px]" onClick={()=>{
                                                    setloading(true) ; 
                                                    setTimeout(() => {
                                                        router.push("/account/order")
                                                    }, 1000);
                                                }}>
                                                    <div className="icon"><CiShoppingCart className="w-[24px] h-[24px] text-[#0C0C0C]" /></div>
                                                    <div className="information text-[18px] text-[#0C0C0C] font-[300] hover:text-[#0C68F4]">Order</div>
                                                </li>
                                                <li  className="flex gap-[16px]  hover:bg-blue-50  transition-colors cursor-pointer p-[5px]" onClick={()=>{
                                                    setloading(true) ; 
                                                    setTimeout(() => {
                                                        router.push("/account/payment")
                                                    }, 1000);
                                                }}>
                                                    <div className="icon"><AiOutlineDollarCircle className="w-[24px] h-[24px] text-[#0C0C0C]" /></div>
                                                    <div className="information text-[18px] text-[#0C0C0C] font-[300] hover:text-[#0C68F4]">Payment</div>
                                                </li>
                                                <li  className="flex gap-[16px]  hover:bg-blue-50  transition-colors cursor-pointer p-[5px]" onClick={()=>{
                                                        document.cookie = "token=; path=/; max-age=0";
                                                        settoken(getCookie("token")) ; 
                                                        
                                                        if(pathname!='/') 
                                                            {
                                                                setloading(true) ;  
                                                                setTimeout(() => {
                                                                router.push("/") ; 
                                                                }, 1000);
                                                            }
                                                        
                                                }}>
                                                    <div className="icon"><SlLogout className="w-[24px] h-[24px] text-[#0C0C0C]" /></div>
                                                    <div className="information text-[18px] text-[#0C0C0C] font-[300] hover:text-[#0C68F4]">Log out</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )
                                    
                                
                            }
                            </button>
                    </div>               
                </div>
                {search && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-start justify-center pt-32">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-300">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">Tìm kiếm sản phẩm</h3>
                                    <button 
                                        onClick={handleSearchTogle}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        title="Close Search"
                                    >
                                        <IoIosCloseCircleOutline className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="thongtin"
                                            placeholder="Nhập từ khóa tìm kiếm..." 
                                            className="w-full h-14 pl-6 pr-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-lg"
                                            autoFocus
                                        />
                                        <button 
                                            type="submit"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            title="Search"
                                        >
                                            <CiSearch className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    {/* Quick search suggestions */}
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        <span className="text-sm text-gray-500">Tìm kiếm phổ biến:</span>
                                        {['iPhone', 'MacBook', 'AirPods', 'iPad'].map((term) => (
                                            <button
                                                key={term}
                                                type="button"
                                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                                onClick={() => {
                                                    const input = document.querySelector('input[name="thongtin"]') as HTMLInputElement;
                                                    if (input) input.value = term;
                                                }}
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                </div>
            </header>
        </>
    )
}