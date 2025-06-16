"use client"
import DescriptionAlerts from "@/app/Components/Alert/Alert_Purhase/Alert_purchase";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useRouter,useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function PurchaseOrderID() {
    const param = useParams<{id:string}>(); 
    const id = parseInt(param.id) ; 
    const [items,setdata] = useState({}) ; 
    const token = getCookie("token") ; 
    const [inforUser,setInfor] = useState({
            paymentMethod: "cash" ,
            taxPrice: 20 , 
            shippingPrice: 20, 
            totalPrice: 20 , 
            shippingAddress : {
                address: null,
                city : "Ha Noi" , 
                postalCode: "lololo" ,
                country: "vn" ,
            },
            qty : 1 ,
            receiver:null ,
        }) ;
    useEffect(()=>{
        if(token)
        {
            const fetchData = async () =>
            {
                const res = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/products/${id}`,{
                    method : "GET" , 
                    headers :{
                        "Content-Type": "application/json",
                    }

                })
                setdata(await res.json()) ; 

            }
            fetchData() ;
            console.log(items) ; 
        }
    },[token])

    const tongtien: number = items.price * 1 - (items.price * (items.discount/100));

    const [Alert,setAlert] = useState(false)
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const hanldeBuyProduct = (e: any) => {
        e.preventDefault();
        const user = e.target.user.value ; 
        const address = e.target.address.value ;
        setAlert(true);
        setProgress(0);
        if(token)
        {
             const BuyProduct = async () =>{
                const res = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/orders/buynow/${id}/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                    paymentMethod: "cash" ,
                    taxPrice: 20 , 
                    shippingPrice: 20, 
                    totalPrice:tongtien  , 
                    shippingAddress : {
                        address: address,
                        city : "Ha Noi" , 
                        postalCode: "lololo" ,
                        country: "vn" ,
                    } , 
                    receiver: user 
        })
                }
                )
                // const data = await res.json();
                // console.log(data) ; 

            }
            BuyProduct() ;
        }
    };

    // Khi Alert bật, tăng progress dần đều, khi hết thì ẩn Alert và chuyển trang
    useEffect(() => {
        if (!Alert) return;
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setAlert(false);
                    setTimeout(() => {
                        router.push("/");
                    }, 300); // delay nhỏ để người dùng thấy alert biến mất
                    return 100;
                }
                return prev + 2; // 2% mỗi 60ms ~ 3s
            });
        }, 60);
        return () => clearInterval(interval);
    }, [Alert, router]);

    // ...rest of your code...
    return (
        <>
            {Alert && (
                <div className="fixed top-6 right-6 z-[99999] w-[350px]">
                    <DescriptionAlerts progress={progress} />
                </div>
            )}
            
                    <form action="" className="flex gap-[24px] mt-[48px]" onSubmit={hanldeBuyProduct}>
                        <div className="w-[60%] px-[32px] py-[24px] border-[1px] border-[#EDEDED] flex flex-col gap-[32px]">
                            <div className="flex flex-col gap-[8px]">
                                <label htmlFor="user" className="text-[20px] text-[#0C0C0C] font-[500]">User</label>
                                <input type="text" name="user" id="user" className="h-[48px] bg-[#F9F9F9] border-[1px] border-[#F6F6F6] rounded-[8px] px-[15px]" placeholder="Nhập tên người nhận" required />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <label htmlFor="address" className="text-[20px] text-[#0C0C0C] font-[500]">Địa Chỉ</label>
                                <input type="text" id="address" name="address" className="h-[48px] bg-[#F9F9F9] border-[1px] border-[#F6F6F6] rounded-[8px] px-[15px]" placeholder="Nhập địa chỉ người nhận" required/>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <label htmlFor="numberPhone text-[20px] text-[#0C0C0C] font-[500] ">Số Điện Thoại</label>
                                <input type="tel" id="numberPhone" name="numberPhone" pattern="[0]{1}[0-9]{9}" placeholder="0-123-456-789" className="h-[48px] bg-[#F9F9F9] border-[1px] border-[#F6F6F6] rounded-[8px] px-[15px]"/>
                            </div>
                         </div>
                        <div className="w-[40%] px-[24px] py-[24px]">
                            <h2 className="font-[500] text-[#0C0C0C] text-[24px]">Your Order</h2>
                            <div className="product flex flex-col gap-[16px] mt-[16px] h-[350px] overflow-scroll">    
                            <>
                                <div className="productItem flex px-[6px] border-b-[1px] border-b-[#CBCBCB] gap-[10px]">
                                    <div className="image w-[30%]">
                                        <img src={items.image} alt=""  className="w-[100%]"/>
                                    </div>
                                    <div className="flex flex-col gap-[23px]  text-[17px] font-[300] text-[#2D2D2D] w-[70%]">
                                        <h2>
                                            <div className="title font-[500] text-[20px]">
                                                {items.name} 
                                            </div>
                                            <div className="color_quantity ">
                                                <div className="">Black</div>
                                                <div className="quantity">x 1</div>
                                            </div>
                                        </h2>
                                        <div className="flex justify-between">
                                            <div className="text-pink-600 text-[20px]">{items.discount}%</div>
                                            <div className="price text-[20px] font-[500] text-red-600 ">{items.price} $</div>
                                        </div>
                                        

                                    </div>
                                </div>
                            </>
                                    
                            </div>
                            <div className="mt-[40px] flex flex-col gap-[40px]">
                                <div className="inforMoney flex justify-between text-[18px] text-[#2D2D2D] font-[500]">
                                    <div className="sotien">Tổng Tiền :</div>
                                    <div className="tong  text-[25px] font-[700] text-emerald-700">{tongtien}$</div>

                                </div>
                                
                                <button className="w-[100%] h-[48px] text-[white] font-[400] text-[16px] items-center text-center bg-[#0C68F4] rounded-[8px]" >Mua Hàng</button>
                            </div>
                            
                        </div>
                        
                        
                    </form>
                
        </>
    )
}