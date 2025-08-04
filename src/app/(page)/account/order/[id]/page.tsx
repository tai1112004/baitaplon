"use client"
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { userApi } from "../../../../../../lib/api";
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
export default function StatusPage() {
    const params = useParams<{id:string}>() ; 
    const id = parseInt(params.id) ; 
    console.log(id) ; 
    const token = getCookie("token") ;
  

    const [data, setdata] = useState<Order>({
        id: 0 ,
        order_Date: "",
        total_price: 0 ,
        note : "",
        shipping : {
            id: 0,
            receiver: "",
            phone_Receiver: "",
            address_receiver: "",
            isDelivered: false,
            note: "",
            },
            status: "",
            user : {
                id: 0 ,
                name: "",
                email: "",
                },
                orderDetails: [],
                

    })
      const formatCurrency = (amount : number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
    useEffect(()=>{
        if(token)
        {
            const fetchData = async () =>{
                const res = await fetch(`${userApi}getDetailOrder/${id}`,{
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
                                <span className="text-[16px] font-light">{data.id}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] ">
                                <span className="text-[16px] font-medium">Thời Gian Đặt</span>
                                <span className="text-[16px] font-light">{data.order_Date}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] bg-neutral-100">
                                <span className="text-[16px] font-medium">Người Nhận</span>
                                <span className="text-[16px] font-light">{data.shipping?.receiver}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium"> Số Điện Thoại</span>
                                <span className="text-[16px] font-light">{data.shipping?.phone_Receiver}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px] bg-neutral-100">
                                <span className="text-[16px] font-medium">ID Vận Chuyên </span>
                                <span className="text-[16px] font-light">2345678910</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Tổng số tiền </span>
                                <span className="text-[16px] font-light">{data.total_price} $</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Địa chỉ người nhận</span>
                                <span className="text-[16px] font-light">{data.shipping?.address_receiver}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Amount Paid</span>
                                <span className="text-[16px] font-light">{formatCurrency(data.total_price)}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Người Đặt Hàng</span>
                                <span className="text-[16px] font-light">{data.user?.name}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Email người đặt hàng</span>
                                <span className="text-[16px] font-light">{data.user?.email}</span>
                            </div>
                            <div className="flex justify-between p-4 items-center h-[56px]">
                                <span className="text-[16px] font-medium">Trạng Thái</span>
                                <span className="text-[16px] font-light">{data.status}</span>
                            </div>

                        </div>
                        <div className="order-status-card mt-[20px] h-[200px] overflow-scroll">
                            {
                                data.orderDetails && (
                                    data.orderDetails.map((item:OrderItem)=>(
                                    <>
                                     <div className="h-[86px] flex mt-1 relative ">
                                            <img src={item.product.images[0]?.image} alt="" />
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[12px] font-light">{item.product?.name}</span>
                                                <span className="text-[10px] font-medium">{item.product?.color}</span>
                                                <span className="text-[10px] font-medium">{item.quantity}</span>
                                            </div>
                                            <span className="absolute bottom-0.5 right-0 text-[12px] font-light">{formatCurrency(item.product.price - item.product.price*(item.product.discount/100))}   from  
                                                {formatCurrency(item.product.price)}</span>

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