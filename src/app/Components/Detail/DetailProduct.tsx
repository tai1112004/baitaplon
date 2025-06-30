"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation"
import { CiShop } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { BiShield } from "react-icons/bi";
import { Sanphamlienquan } from "../sanphamlienquan/sanphamlienquan";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { WrongPage } from "../notification/wrong";
import { AddCartPage } from "../notification/addCart";
import { LoadingPage } from "../notification/loading";

type props = {
    category : string ; 
};
type dataCommnents=
{
    name: string ;
    image : string ; 
    rating: number ; 
    content:string ; 
    date: string  ; 
} ;
// type data = {
//     _id: number;
//     name: string;
//     image: string;
//     price: number;
//     discount: number;
//     brand: string; // Changed from number to string
//     screen_size: string;
//     drive_size: string;
//     processor: string;
//     ram: string;
//     gpu_brand: string;
//     description: string;
//     rating: number;
//     countInStock: number;
//     category: string;
// };
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
export const DetailComputer = ({category}:props) =>{
    const router = useRouter() ; 
    const params= useParams<{id:string}>(); 
    const id = parseInt(params.id)  ;
    const asPathname = usePathname();
    
    const [data_itemProduct, setdata] = useState<data>({
  _id: 0,
  name: "",
  image: "",
  description: "",
  rating: 0,
  price: 0,
  countInStock: 0,
  discount: 0,
  ram: "",
  screen_size: "",
  processor: "",
  gpu_brand: "",
  drive_size: "",
  brand: 0,
  category: 0,
});
    const [product,setproduct] = useState([]) ; 
    const [wrong, setwrong] = useState(false) ; 
    const [loading, setloading] = useState(false) ;
    const [addcart , setAddCart] = useState(false) ; 
    const [selectedPayment, setSelectedPayment] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceTrue, setPriceTrue] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const token = getCookie("token") ;  
    
    const data_wrong = {
        title : "Bạn chưa đăng nhập !!!"
    }
    const data_addcart = {
        title: "Sản phẩm đã được thêm vào giỏ hàng !!!"
    }

    useEffect(()=>{
        const data_product = async () =>{
            // Lấy 7 trang (2,3,4,5,6,7,8) = 56 sản phẩm
            const data = await fetch(`https://ecommerce-django-production-6256.up.railway.app/api/products/categories/${category}`)
            const json = await data.json();
            setproduct(Array.isArray(json.products) ? json.products : []);
        }
        data_product() ; 
    },[])

    useEffect(()=>{
        const fetchData = async () =>
        {
            const res = await fetch(`https://ecommerce-django-production-6256.up.railway.app/api/products/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setdata(await res.json()) ; 
            
        }
        fetchData();
    },[token])
    useEffect(()=>{
        if (
            data_itemProduct &&
            typeof data_itemProduct.price === "number" &&
            typeof data_itemProduct.discount === "number"
        ) {
            setPrice(data_itemProduct.price - data_itemProduct.price * (data_itemProduct.discount / 100));
            setPriceTrue(data_itemProduct.price);
        }
    },[quantity])
    useEffect(() => {
        // setSearchState(asPathname); // Removed undefined function
    },[asPathname]);
    // useEffect(()=>{
    //     if(data_itemProduct)
    //     {
    //         ;
    //     }
    // },[])
    useEffect(()=>{
        if (data_itemProduct) {
            const price = data_itemProduct.price ?? 0;
            const discount = data_itemProduct.discount ?? 0;
            setPrice((price - price * (discount / 100)) * quantity);
            setPriceTrue(price * quantity);
        }
            
        
    },[quantity])
    const arrayurl = asPathname.split("/"); 
  
    const [check, setCheck] = useState<dataCommnents[]>([]) ; 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        const contents = (e.target as HTMLFormElement).comments.value;
        console.log(contents) ;
        if(contents!= null && userRating > 0)
        {
            const newComment = {
                id: Math.floor(Math.random() * 1000),
                "name": "Hoang Tai",
                "image": "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/474213593_1654634585477210_6135141105138811194_n.jpg?stp=c0.30.500.500a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeHmpvqvGu7sLnSwrDp3yzywgN7ByMDJtsOA3sHIwMm2w5qNaq2CO7UpB4VgII4nTdDIvZWfevN5ZIZnN7i9Nm3H&_nc_ohc=Qa1TanZSCt4Q7kNvwHS7V4s&_nc_oc=AdltgWRhrZRuBSe8byGgbO0gQRevE6JxnOTm6c2HqVbnHnqrTaihxMNMIRSBW91edDQ&_nc_zt=24&_nc_ht=scontent.fhan20-1.fna&_nc_gid=YuunvZTHQrkZlkTgHurO8g&oh=00_AfPv_Sh-MzSp-ai9x_uro9PWlmTEUBQExHVcaXL23Q9PgQ&oe=6854C026",
                "content": contents,
                "rating": userRating,
                "date": new Date().toLocaleDateString('vi-VN')
            }
            setCheck([...check,newComment]) ;
            (e.target as HTMLFormElement).comments.value = null ;
            setUserRating(0);
            setHoveredRating(0);
        }
    }

    const handleBuy=() =>{
        if(!token)
        {
            setwrong(true) ; 
            setTimeout(() => {
                setwrong(false) ; 
            }, 1600);
        }
        else
        {
            setloading(true) 
            setTimeout(() => {
                router.push(`/PurchaseOrder/${id}`)
            }, 2000);
        }
    }

    const handleAddCart=() =>{
        if(!token)
        {
            setwrong(true) ; 
            setTimeout(() => {
                setwrong(false) ; 
            }, 1600);
        }
        else 
        {
            const add_cart = async() =>{
                await fetch(`https://ecommerce-django-production-6256.up.railway.app/api/orders/addtocart/${id}/`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization':`Bearer ${token}` , 
                    },
                })
            }
            add_cart() ;
            setAddCart(true) ; 
            setTimeout(() => {
                setAddCart(false) ; 
            }, 1700);
        }
    }

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }
        
        return stars;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {wrong && <WrongPage data={data_wrong} />}
            {addcart && <AddCartPage data={data_addcart} />}
            {loading && <LoadingPage/>}
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 py-4">
                {arrayurl.map((item:string, index) => (
                    <div key={index} className="flex items-center">
                        {index === 0 ? (
                            <span className="hover:text-blue-600 cursor-pointer">Home</span>
                        ) : (
                            <>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="hover:text-blue-600 cursor-pointer capitalize">{item}</span>
                            </>
                        )}
                    </div>
                ))}
            </nav>

            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Product Images */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden mb-4 group">
                            <img 
                                src={data_itemProduct.image} 
                                alt={data_itemProduct.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Information */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                            {data_itemProduct.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                {renderStars(data_itemProduct.rating || 4.5)}
                                <span className="ml-2 text-sm text-gray-600">
                                    ({data_itemProduct.rating || 4.5})
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">• 125 đã bán</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                                <CiShop className="text-green-600 w-5 h-5"/>
                                <span className="text-sm text-green-700 font-medium">Còn hàng</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                                <CiDeliveryTruck className="text-blue-600 w-5 h-5"/>
                                <span className="text-sm text-blue-700 font-medium">Miễn phí vận chuyển</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
                                <BiShield className="text-orange-600 w-5 h-5"/>
                                <span className="text-sm text-orange-700 font-medium">Bảo hành chính hãng</span>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Table */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Thương hiệu", value: data_itemProduct.brand },
                                { label: "Model", value: data_itemProduct.name },
                                { label: "Kích thước màn hình", value: data_itemProduct.screen_size },
                                { label: "Ổ cứng", value: data_itemProduct.drive_size },
                                { label: "CPU", value: data_itemProduct.processor },
                                { label: "RAM", value: data_itemProduct.ram },
                                { label: "GPU", value: data_itemProduct.gpu_brand }
                            ].map((spec, index) => (
                                spec.value && (
                                    <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                                        <span className="text-gray-600 font-medium">{spec.label}:</span>
                                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* Purchase Section */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-baseline gap-2">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-red-600">
                                    {price}$
                                    
                                </span>
                                <s className="text-2xl font-bold text-gray-300">{priceTrue}$</s>
                                </div>
                                
                                {data_itemProduct.discount && (
                                    <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                                        <CiDiscount1 className="w-4 h-4 text-red-600"/>
                                        <span className="text-sm font-semibold text-red-600">
                                            -{data_itemProduct.discount}%
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    aria-label="Thêm vào danh sách yêu thích"
                                    title="Thêm vào danh sách yêu thích"
                                >
                                    <FiHeart className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    aria-label="Chia sẻ sản phẩm"
                                    title="Chia sẻ sản phẩm"
                                >
                                    <FiShare2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng:</label>
                            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Phương thức thanh toán</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="cash"
                                        checked={selectedPayment === "cash"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-gray-700">Thanh toán khi nhận hàng</span>
                                    <span className="ml-auto text-sm text-green-600 font-medium">Phổ biến</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="card"
                                        checked={selectedPayment === "card"}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-gray-700">Thanh toán bằng thẻ</span>
                                    <span className="ml-auto text-sm text-blue-600 font-medium">An toàn</span>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button 
                                onClick={handleBuy}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Mua ngay
                            </button>
                            <button 
                                onClick={handleAddCart}
                                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-xl transition-all duration-200"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-500">
                            <p>✓ Bảo hành chính hãng • ✓ Đổi trả trong 7 ngày</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Mô tả sản phẩm
                </h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                    {data_itemProduct.description}
                </div>
            </div>

            {/* Detailed Specifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Thông tin chi tiết
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Thương hiệu", value: data_itemProduct.brand },
                        { label: "Tên model", value: data_itemProduct.name },
                        { label: "Kích thước màn hình", value: data_itemProduct.screen_size },
                        { label: "Dung lượng ổ cứng", value: data_itemProduct.drive_size },
                        { label: "Bộ xử lý", value: data_itemProduct.processor },
                        { label: "RAM", value: data_itemProduct.ram },
                        { label: "Card đồ họa", value: data_itemProduct.gpu_brand }
                    ].map((spec, index) => (
                        spec.value && (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{spec.label}:</span>
                                <span className="font-semibold text-gray-900">{spec.value}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Related Products */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Sản phẩm liên quan
                </h2>
                <Sanphamlienquan data_products={{ products: product as data[] }} /> 
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Comment Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h3>
                            <p className="text-gray-600 mb-6">Chia sẻ trải nghiệm của bạn để giúp khách hàng khác</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Star Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Đánh giá của bạn *
                                    </label>
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className="p-1 transition-transform hover:scale-110"
                                                onClick={() => setUserRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                title={`Chọn ${star} sao`}
                                            >
                                                <FaStar 
                                                    className={`w-6 h-6 transition-colors ${
                                                        star <= (hoveredRating || userRating) 
                                                            ? 'text-yellow-400' 
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {userRating === 0 && "Chọn số sao để đánh giá"}
                                        {userRating === 1 && "⭐ Rất tệ"}
                                        {userRating === 2 && "⭐⭐ Tệ"}
                                        {userRating === 3 && "⭐⭐⭐ Bình thường"}
                                        {userRating === 4 && "⭐⭐⭐⭐ Tốt"}
                                        {userRating === 5 && "⭐⭐⭐⭐⭐ Xuất sắc"}
                                    </p>
                                </div>

                                <textarea 
                                    name="comments"
                                    placeholder="Viết đánh giá của bạn tại đây..."
                                    className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                                <button 
                                    type="submit"
                                    disabled={userRating === 0}
                                    className={`w-full font-semibold py-3 rounded-xl transition-all ${
                                        userRating === 0 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    {userRating === 0 ? 'Vui lòng chọn số sao' : 'Gửi đánh giá'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            Đánh giá từ khách hàng ({check.length})
                        </h3>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {check.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                                </div>
                            ) : (
                                check.map((item: dataCommnents, index: number) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <div className="flex items-start gap-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                    <div className="flex">
                                                        {[1,2,3,4,5].map((star:number) => {
                                                            if(star <= item.rating) return (<FaStar key={star} className="w-4 h-4 text-yellow-400" />)
                                                            return (
                                                                <FaStar key={star} className="w-4 h-4 text-gray-300" />
                                                            )
                                                        })
                                                    }  
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}