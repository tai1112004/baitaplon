"use client"
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/app/Components/notification/loading";
import { NullPage } from "@/app/Components/notification/null";
export default function OrdersPage (){
    const [data, setdata] = useState<any[]>([]) ; 
    const token = getCookie("token") ;
    const [loading, setloading] = useState(false) ;
    const router = useRouter() ;
    useEffect(()=>{ 
        const fetchdata = async () =>
        {
            const res = await fetch("https://ecommerce-django-production-7581.up.railway.app/api/orders/myorders",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            }
            )
        const allOrders = await res.json();
        const deliveredOrders = allOrders.filter((item: any) => item.isDelivered === false);
        setdata(deliveredOrders);
        }
        fetchdata() ;
    }, [token])
    const handleClick=(id:number)=>{
        setloading(true) ; 
        setTimeout(() => {
            router.push(`/account/order/${id}`)
        }, 2000);
    }
    return (
        <>
        {
            loading && (
                <>
                    <LoadingPage/>
                </>
            )
        }
            <div className="">
                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Order History</span>

                            <span className="p-2 text-[16px] font-light text-gray-500"> Track, return or purchase items
                            </span>
                        </div>
                        <div className="nav-order  ">
                            <ul className="flex gap-8 p-2">
                                <li className=" nav-order-list-checked">
                                    <a href="/account/order">Current</a>
                                </li>
                                <li className="nav-order-list"> <a href="/account/order/delivery">Delivered</a></li>
                                <li className="nav-order-list"><a href="#">Canceled</a></li>
                                <li className="nav-order-list"><a href="#">Returned</a></li>
                            </ul>
                        </div>
                        <div className="current-list">
                            {
                                data.length>0 ? (
                                    data.map((item, index) =>
                                (
                                    <>
                                    <div className="order-card w-[100%] h-[275px] py-4 flex gap-6 flex-col">
                                        <div className="flex justify-between">
                                            <table className="w-[800px]">
                                                
                                                    <tr className="w-[100%] ">
                                                        <th>order code</th>
                                                        <th>Placed on</th>
                                                        <th>Total</th>
                                                        <th>Sent to</th>
                                                    </tr>
                                                
                                                    <tr className="text-[18px] font-light w-[100%] text-center">
                                                        <td>{item._id}</td>
                                                        <td>{item.createdAt}</td>
                                                        <td>{item.totalPrice}</td>
                                                        <td>{item.receiver}</td>

                                                    </tr>   
                                                
                                            
                                            </table>
                                            <div className="text-primary-200" onClick={()=>handleClick(item._id)}>Order Status </div>
                                        </div>
                                        
                                        <div className="order-imgae flex gap-5 flex-wrap ">
                                            {
                                                item.orderItems.map((image:any,index :number)=>
                                                (
                                                    <>
                                                        <div className="w-[100px] h-[100px]">
                                                            <img src={image.image} title={image.name}  className="w-[100px] h-[100px]"/>
                                                        </div>
                                                        
                                                    </>
                                                ) )
                                            }
                                        </div>
                                     </div>
                                    </>
                                ))
                                ): (
                                    <NullPage/>
                                )
                                
                            }
                            
                        </div>


                    </div>
        </>
    )
}