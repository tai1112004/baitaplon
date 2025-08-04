"use client"
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/app/Components/notification/loading";
import { NullPage } from "@/app/Components/notification/null";
import { userApi } from "../../../../../lib/api";

// type item = {
//     image :string , 
//     name :string 
// }
type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    note: string;
    product : productType ;  
    // add other properties if needed
};
type shippingType = {
    id: number;
    receiver: string;
    phone_Receiver: string;
    address_receiver: string;
    isDelivered: boolean;
    note: string;
};
type userType = {
    id: number;
    name: string;
    email: string;
};
type productType = {
    id: number;
    name: string;
    quantity: number;
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

type Order = {
    id: number ; 
    order_Date: string;
    total_price: number;
    note : string ;
    shipping : shippingType;
    status: string;
    user : userType ; 
    orderDetails: OrderItem[];
    // add other properties if needed
};

export default function OrdersPage (){
    const [data, setdata] = useState<Order[]>([]) ; 
    const token = getCookie("token") ;
    const [loading, setloading] = useState(false) ;
    const router = useRouter() ;
    useEffect(()=>{ 
        const fetchdata = async () =>
        {
            const res = await fetch(`${userApi}order/status/pending`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            }
            )
        const allOrders = await res.json();
        // const deliveredOrders = allOrders.filter((item: Order) => item.isDelivered === false);
        setdata(allOrders as Order[]); // Assuming allOrders is an array of Order objects
        }
        fetchdata() ;
    }, [token])
      const formatCurrency = (amount : number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
    const handleClick=(id:number)=>{
        setloading(true) ; 
        setTimeout(() => {
            router.push(`/account/order/${id}`)
        }, 2000);
    }
    const handleTranferPage=(link:string) => {
        setloading(true) ;
        setTimeout(()=>{
            router.push(link) ; 
        },2000)
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
                                    <div onClick={()=>{handleTranferPage("/account/order")}}>Current</div>
                                </li>
                                <li className="nav-order-list"> <div onClick={()=>{handleTranferPage("/account/order/delivery")}}>Delivered</div></li>
                                <li className="nav-order-list"><div >Canceled</div></li>
                                <li className="nav-order-list"><div>Returned</div></li>
                            </ul>
                        </div>
                        <div className="current-list">
                            {
                                data.length>0 ? (
                                    data.map((item) =>
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
                                                        <td>{item.id}</td>
                                                        <td>{item.order_Date}</td>
                                                        <td>{formatCurrency(item.total_price)}</td>
                                                        <td>{item.shipping.receiver}</td>

                                                    </tr>   
                                                
                                            
                                            </table>
                                            <div className="text-primary-200" onClick={()=>handleClick(item.id)}>Order Status </div>
                                        </div>
                                        
                                        <div className="order-imgae flex gap-5 flex-wrap ">
                                            {
                                                item.orderDetails.map((orderItem: OrderItem) =>
                                                (
                                                    <>
                                                        <div className="w-[100px] h-[100px]">
                                                            <img src={orderItem.product.images[0]?.image} title={orderItem.product.name}  className="w-[100px] h-[100px]"/>
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