"use client"
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineHighQuality } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import {useState} from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingThreeDotsJumping from "../loading/loading";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { DelPage } from "../notification/del";
import { NullPage } from "../notification/null";
import { LoadingPage } from "../notification/loading";
// import { WrongPage } from "../notification/wrong";
import { Truck, Award, Trash2, Plus, Minus, ShoppingBag, Package, CreditCard } from 'lucide-react';

// const DelPage = () => (
//   <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
//     <div className="flex items-center gap-2">
//       <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
//       Đã xóa sản phẩm khỏi giỏ hàng
//     </div>
//   </div>
// );

// Error notification  
type WrongPageProps = {
  data: { title: string };
};

const WrongPage = ({ data }: WrongPageProps) => (
  <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">!</div>
      {data.title}
    </div>
  </div>
);

// Empty cart component

const PageLoading = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-700 font-medium">Đang xử lý...</p>
    </div>
  </div>
);
type CartItem = {
    product: number;
    name: string;
    image: string;
    price: number;
    qty: number;
    // add other properties if needed
};

export const Giohang =() =>{
    const [loading,setloading] = useState(false);
    const [loading1,setloading1] = useState(false);
    const [data,setData] = useState<CartItem[]>([]);
    const [del,setdel] = useState(false);
    const [wrong , setwrong] = useState(false);
    const data_wrong = {
        title : "Giỏ hàng rỗng !!!!"
    }
    const PageNull = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <NullPage />
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Giỏ hàng trống</h3>
    <p className="text-gray-500 mb-6">Hãy thêm một số sản phẩm vào giỏ hàng của bạn</p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200" onClick={()=>{
        setloading1(true) 
        setTimeout(() => {
            rounter.push("/products") ; 
        }, 2000);
    }
    }>
      Tiếp tục mua sắm
    </button>
  </div>
);
    const token = getCookie("token") ; 
    useEffect(()=>{
        if(token)
        {
            const cart = async () =>{
                const res = await fetch("https://ecommerce-django-production-7581.up.railway.app/api/orders/cart/",{
                    method:"GET",
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                })
                const data = await res.json();
                setData(data) ; 
            }
            cart();
            console.log(data); 
        }
    },[token])
    const rounter= useRouter() ; 
        const [sum,setsum] = useState(0) ;
    useEffect(()=>{
        var tongtien = 0 ; 
        if(data.length!==0)
        {
             tongtien = data.reduce((sum, items) => {
            return sum + items.price * items.qty;
            }, 0);
        }
        setsum(tongtien);
    },[data]) ; 
    
    const handleClickReduce = (e: any) => {
        const pointer = parseInt(e.target.id);
        const newData = data.map((item, index) => {
            if (pointer === index) {
                if (item.qty > 1) {
                    return { ...item, qty: item.qty - 1 };
                }
            }
            return item;
        });
        setData(newData);
    }
    const handleClickIncrease =(e:any)=>
    {
        const pointer = parseInt(e.target.id) ; 
        const newData = data.map((item, index) => {
            if (pointer === index) {
                
                    return { ...item, qty: item.qty + 1 };
                
            }
            return item;
        });
        setData(newData); 
        
    }
    const handleClickDelete=(pointer:number)=>{
        const del = async() =>{
            const res = await fetch(`https://ecommerce-django-production-7581.up.railway.app/api/orders/removefromcart/${pointer}/`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
                    
        }
        del() ; 
       
        const newData = data.filter((item, index) =>
        {
            return item.product !== pointer ;

        }) 
        setData(newData);
        setdel(true) ; 
        setTimeout(() => {
            setdel(false) ; 
        }, 2000);
        
    

    }
    const handlePurchase =()=>{
        if(data.length>0)
        {
            setloading(true) ; 
            setTimeout(() => {
                rounter.push("/PurchaseOrder") ;
            }, 1000);
        }
        else 
        {
            setwrong(true) ; 
            setTimeout(() => {
                setwrong(false)
            }, 1500);
        }
        
        
    }
    return (
        <>
            {loading && <PageLoading />}
            {del && <DelPage />}
            {wrong && <WrongPage data={data_wrong} />}
            {loading1 && <LoadingPage/>}
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn</h1>
                        <p className="text-gray-600">
                            {data.length > 0 ? `${data.length} sản phẩm trong giỏ hàng` : "Không có sản phẩm nào"}
                        </p>
                    </div>

                    {data.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Products List */}
                            <div className="lg:col-span-2 space-y-4">
                                {data.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="p-6">
                                            <div className="flex gap-6">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    
                                                    {/* Product Features */}
                                                    <div className="flex flex-wrap gap-4 mb-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                                                            <span>Đen</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-blue-600">
                                                            <Truck className="w-4 h-4" />
                                                            <span>Miễn phí vận chuyển</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-green-600">
                                                            <Award className="w-4 h-4" />
                                                            <span>Bảo hành chính hãng</span>
                                                        </div>
                                                    </div>

                                                    {/* Price and Actions */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-2xl font-bold text-gray-900">
                                                            ${item.price.toLocaleString()}
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-4">
                                                            {/* Delete Button */}
                                                            <button
                                                                onClick={() => handleClickDelete(item.product)}
                                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                                aria-label="Xóa sản phẩm khỏi giỏ hàng"
                                                                title="Xóa sản phẩm khỏi giỏ hàng"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>

                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() => handleClickReduce(index)}
                                                                    disabled={item.qty <= 1}
                                                                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                                    title="Giảm số lượng"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <div className="px-4 py-2 bg-gray-50 min-w-[3rem] text-center font-medium">
                                                                    {item.qty}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleClickIncrease(index)}
                                                                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                                                                    title="Tăng số lượng"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                        <h2 className="text-xl font-semibold text-gray-900">Chi tiết thanh toán</h2>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tạm tính</span>
                                            <span>${sum.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Phí vận chuyển</span>
                                            <span className="text-green-600">Miễn phí</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Thuế VAT</span>
                                            <span>${(sum * 0.1).toLocaleString()}</span>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                                            <span>Tổng cộng</span>
                                            <span>${(sum * 1.1).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePurchase}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Package className="w-5 h-5" />
                                            Tiến hành thanh toán
                                        </div>
                                    </button>

                                    <div className="text-center text-sm text-gray-500 mt-4">
                                        Thanh toán an toàn và bảo mật
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <PageNull />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};