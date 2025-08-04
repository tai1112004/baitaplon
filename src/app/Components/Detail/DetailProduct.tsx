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
import { generalApi, userApi } from "../../../../lib/api";

type props = {
    category : string ; 
};
type dataCommnents=
{
    id: number ;
    user : string ; 
    rating: number ; 
    content:string ; 
    date: string  ; 
} ;

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
    renewList: dataCommnents[]  ;  
}
// type renewType = {
//     id: number ;
//     user: string ;
//     content: string ;
//     date: string ;
//     rating: number ;
// }
type imageType = {
    id: number;
    image: string ; 
}
type inforUser = {
    id: number ;
    name : string;  
}
export const DetailComputer = ({category}:props) =>{
    console.log(category)
    const router = useRouter() ; 
    const params= useParams<{id:string}>(); 
    const id = parseInt(params.id)  ;
    const asPathname = usePathname();
    
    const [data_itemProduct, setdata] = useState<data>({
        id: 0,
        name: "",
        quantity: "",
        description: "",
        color: "",
        price: 0,
        discount: 0,
        RAM: "",
        screen: "",
        gpu: "",
        cpu: "",
        driver_size: "",
        count_camera: "",
        resolution: "",
        sensor: "",
        capacity_battery: "",
        operating_system: "",
        connectivity: "",
        audio_technical: "",
        style: "",
        time_battery: "",
        delay: "",
        support_stylus: false,
        brand: "",
        categories: "",
        images: [],
        renewList:[]
});
    const [user , setuser]  = useState<inforUser>({
        id: 0 ,
        name: "",
        
    })
    const [product,setproduct] = useState<data[]>([]) ; 
    const [check, setCheck] = useState<dataCommnents[]>([]) ; 
    const [wrong, setwrong] = useState(false) ; 
    const [loading, setloading] = useState(false) ;
    const [addcart , setAddCart] = useState(false) ; 
    const [selectedPayment, setSelectedPayment] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceTrue, setPriceTrue] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // New state for selected image
    const token = getCookie("token") ;  
     const formatCurrency = (amount : number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
    const [data_wrong,setdata_wrong] = useState({
        title : "Bạn chưa đăng nhập !!!"
    })
    const data_addcart = {
        title: "Sản phẩm đã được thêm vào giỏ hàng !!!"
    }


    useEffect(()=>{
        const data_product = async () =>{
            // Lấy 7 trang (2,3,4,5,6,7,8) = 56 sản phẩm
            const data = await fetch(`${generalApi}getProducts/Categories/${category}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ name: category }) // Assuming you want to filter by category
                }
            )
            const json = await data.json();
            setproduct(Array.isArray(json) ? json: []);
        }
        data_product() ; 
    },[])

    useEffect(()=>{
        const fetchData = async () =>
        {
            const res = await fetch(`${generalApi}getProducts/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json() as data;
            setdata(data) ; 
            
            setCheck(data.renewList as dataCommnents[])

        }
        fetchData();
        // if(data_itemProduct.renewList.length>0) 
        //     {
        //         setCheck(data_itemProduct.renewList)
        //     }
        //     else console.log("co cai dau buoi")
        // console.log("tao dang o day " + data_itemProduct) ;
    },[token])
    // useEffect(()=>{
    //     setCheck(data_itemProduct.renewList)
    // },[])
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

    useEffect(()=>{
        if (data_itemProduct) {
            const price = data_itemProduct.price ?? 0;
            const discount = data_itemProduct.discount ?? 0;
            setPrice((price - price * (discount / 100)) * quantity);
            setPriceTrue(price * quantity);
        }
    },[quantity])
    useEffect(()=>{
        const fetchDataUser = async () =>
        {
            const res = await fetch(`${userApi}getProfile`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }

                })
                setuser(await res.json()) ;
        }
        fetchDataUser();
    },[])
    // Helper function to filter out empty/null/undefined specifications
    const getValidSpecs = () => {
        const specs = [
            { label: "Thương hiệu", value: data_itemProduct.brand },
            { label: "Model", value: data_itemProduct.name },
            { label: "Kích thước màn hình", value: data_itemProduct.screen },
            { label: "Ổ cứng", value: data_itemProduct.driver_size },
            { label: "CPU", value: data_itemProduct.cpu },
            { label: "RAM", value: data_itemProduct.RAM },
            { label: "GPU", value: data_itemProduct.gpu },
            { label: "Camera sau", value: data_itemProduct.count_camera },
            { label: "Độ phân giải", value: data_itemProduct.resolution },
            { label: "Cảm biến", value: data_itemProduct.sensor },
            { label: "Dung lượng pin", value: data_itemProduct.capacity_battery },
            { label: "Hệ điều hành", value: data_itemProduct.operating_system },
            { label: "Kết nối", value: data_itemProduct.connectivity },
            { label: "Kỹ thuật âm thanh", value: data_itemProduct.audio_technical },
            { label: "Kiểu dáng", value: data_itemProduct.style },
            { label: "Thời gian sử dụng pin", value: data_itemProduct.time_battery },
            { label: "Độ trễ", value: data_itemProduct.delay },
        ];
        
        return specs.filter(spec => 
            spec.value && 
            spec.value.toString().trim() !== "" && 
            spec.value !== null && 
            spec.value !== undefined
        );
    };
    
    const arrayurl = asPathname.split("/"); 
  
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        const contents = (e.target as HTMLFormElement).comments.value;
        console.log(contents) ;
        if(contents!= null && userRating > 0)
        {
            const newComment:dataCommnents = {
                id : user.id , 
                user : user.name,
                rating: userRating ,
                content: contents ,
                date:  (new Date()).toISOString(),


            }
            const addRenew = async()=>{
                
                    const response = await fetch(`${userApi}addRenew/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(newComment)
                            });
                            const data = await response.json();
                            if(response.status==200)
                            {
                                
                                setCheck([...check, data]);
                            }
                            if(response.status==500)
                            {
                                setdata_wrong({
                                    title: "Bạn chưa đăng nhập !!!" 
                                })
                                setwrong(true) ; 
                                setTimeout(() => {
                                    setwrong(false) ;
                                     
                                }, 1600);
                            }
                            if(response.status==400) {
                                
                                setdata_wrong({
                                    title: "Bạn chưa mua hàng hoặc bạn bình luận rồi!!!" 
                                })
                                setwrong(true) ; 
                                setTimeout(() => {
                                    setwrong(false) ;
                                    setdata_wrong({
                                    title: "Bạn chưa đăng nhập !!!" 
                                })
                                     
                                }, 1600);
                            }
                            
                            

            
            
                }
                addRenew();
            
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
                await fetch(`${userApi}addBasket/${id}`,{
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
                {/* Product Images - Enhanced */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden mb-4 group">
                            <img 
                                src={data_itemProduct.images[selectedImageIndex]?.image || data_itemProduct.images[0]?.image} 
                                alt={data_itemProduct.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Thumbnail Images */}
                        {data_itemProduct.images && data_itemProduct.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {data_itemProduct.images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                                            selectedImageIndex === index 
                                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img 
                                            src={image.image} 
                                            alt={`${data_itemProduct.name} - Ảnh ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
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
                                {renderStars(4.5)}
                                <span className="ml-2 text-sm text-gray-600">
                                    ({1 || 4.5})
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

                    {/* Specifications Table - Only show non-empty specs */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                        <div className="space-y-3">
                            {getValidSpecs().map((spec, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                                    <span className="text-gray-600 font-medium">{spec.label}:</span>
                                    <span className="text-gray-900 font-semibold">{spec.value}</span>
                                </div>
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
                                    {formatCurrency(price)}
                                    
                                </span>
                                <s className="text-2xl font-bold text-gray-300">{formatCurrency(priceTrue)}</s>
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

            {/* Detailed Specifications - Only show non-empty specs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Thông tin chi tiết
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getValidSpecs().map((spec, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="font-semibold text-gray-900">{spec.value}</span>
                        </div>
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
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-900">{item.user}</h4>
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