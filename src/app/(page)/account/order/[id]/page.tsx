"use client"
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
export default function StatusPage() {
    const params = useParams<{id:string}>() ; 
    const id = parseInt(params.id) ; 
    console.log(id) ; 
    const token = getCookie("token") ;
    type OrderItem = {
        image: string;
        name: string;
        qty: number;
        price: number;
        discount: number;
    };

    type OrderData = {
        _id?: string;
        createdAt?: string;
        receiver?: string;
        paymentMethod?: string;
        totalPrice?: number;
        orderItems?: OrderItem[];
        shippingAddresss?: shippingAddress;
        user:user ;
    };
    type shippingAddress= {
        address?:string;
    }
    type user = {
        username?:string ; 
        email?: string ; 
    }

    const [data, setdata] = useState<OrderData>({
        _id: "",
        createdAt: "",
        receiver: "",
        paymentMethod: "",
        totalPrice: 0,
        orderItems: [],
        shippingAddresss: { address: "" },
        user: { username: "", email: "" }
    })
    useEffect(()=>{
        if(token)
        {
            const fetchData = async () =>{
                const res = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/orders/${id}/`,{
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                setdata(await res.json()) ; 
            }
            fetchData() ;
            console.log(data)
        }
    },[token])
    return (
        <>
            <div className="">
                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Order Status</span>

                            <span className="p-2 text-[16px] font-light text-gray-500"> Track your order
                            </span>
                        </div>
                        {/* <img className="w-[912px] h-[292px]" src="../img/order-status.png" alt="" /> */}
                        <div className="order-status-info flex flex-col mt-6  w-[1000px]">
                            <div className="flex justify-between p-4 items-center h-[56px] bg-neutral-100">
                                <span className="text-[16px] font-medium">Mã</span>
                                <span className="text-[16px] font-light">{data._id}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] ">
                                <span className="text-[16px] font-medium">Thời Gian Đặt</span>
                                <span className="text-[16px] font-light">{data.createdAt}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] bg-neutral-100">
                                <span className="text-[16px] font-medium">Người Nhận</span>
                                <span className="text-[16px] font-light">{data.receiver}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Loại Thanh Toán </span>
                                <span className="text-[16px] font-light">{data.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] bg-neutral-100">
                                <span className="text-[16px] font-medium">ID Vận Chuyên </span>
                                <span className="text-[16px] font-light">2345678910</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Tổng số tiền </span>
                                <span className="text-[16px] font-light">{data.totalPrice} $</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Địa chỉ người nhận</span>
                                <span className="text-[16px] font-light">{data.shippingAddresss?.address}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Amount Paid</span>
                                <span className="text-[16px] font-light">{data.totalPrice}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Người Đặt Hàng</span>
                                <span className="text-[16px] font-light">{data.user.username}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Email người đặt hàng</span>
                                <span className="text-[16px] font-light">{data.user.email}</span>
                            </div>

                        </div>
                        <div className="order-status-card mt-[20px] h-[200px] overflow-scroll">
                            {
                                data.orderItems && (
                                    data.orderItems.map((item:OrderItem)=>(
                                    <>
                                     <div className="h-[86px] flex mt-1 relative ">
                                            <img src={item.image} alt="" />
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[12px] font-light">{item.name}</span>
                                                <span className="text-[10px] font-medium">Black</span>
                                                <span className="text-[10px] font-medium">{item.qty}</span>
                                            </div>
                                            <span className="absolute bottom-0.5 right-0 text-[12px] font-light">{item.price - item.price*(item.discount/100)}from
                                                {item.price}</span>

                                    </div>
                                    </>
                                ))
                                )
                                
                            }
                           
                            
                        </div>



                    </div>
        </>
    )
}