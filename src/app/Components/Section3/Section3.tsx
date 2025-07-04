"use client"
import { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "../notification/loading";

type data = {
    _id: number;
    name: string;
    image: string;
    description: string;
    rating: number;
    price: number;
    countInStock: number;
    discount: number;
    ram?: string;
    screen_size?: string;
    processor?: string;
    gpu_brand?: string;
    drive_size?: string;
    brand: number;
    category: number;
}

export const Section3 = () => {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [sanpham, setSanpham] = useState<data[]>([]);
    const [loading, setLoading] = useState(false); // Bắt đầu với loading = true
    const router = useRouter();

    // Fetch data from API
    useEffect(() => {
        const getdata = async () => {
                
                
                const res = await fetch("https://ecommerce-django-production-6256.up.railway.app/api/products/discount");
                const json = await res.json();
                setSanpham(Array.isArray(json.products) ? json.products : []);
                // Kiểm tra dữ liệu trả về
                
        };

        getdata();
    }, []);

    // Auto-play carousel chỉ khi có sản phẩm
    useEffect(() => {
        if (!isAutoPlaying || sanpham.length === 0) return;
        
        const maxIndex = Math.max(0, sanpham.length - 3);
        const interval = setInterval(() => {
            setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, sanpham.length]);

    // const handlePrev = () => {
    //     if (sanpham.length === 0) return;
    //     const maxIndex = Math.max(0, sanpham.length - 3);
    //     setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
    //     setIsAutoPlaying(false);
    // };

    // const handleNext = () => {
    //     if (sanpham.length === 0) return;
    //     const maxIndex = Math.max(0, sanpham.length - 3);
    //     setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    //     setIsAutoPlaying(false);
    // };

    const handleTranferPage = (id: number, category: number) => {
        let url: string;
        
        switch (category) {
            case 3:
                url = `/products/mobilePhones/${id}`;
                break;
            case 4:
                url = `/products/laptopAndComputer/${id}`;
                break;
            case 5:
                url = `/products/tablets/${id}`;
                break;
            case 6:
                url = `/products/audio/${id}`;
                break;
            case 7:
                url = `/products/cameras/${id}`;
                break;
            case 9:
                url = `/products/wearables/${id}`;
                break;
            case 10:
                url = `/products/gaming/${id}`;
                break;
            case 11:
                url = `/products/networking/${id}`;
                break;
            default:
                url = `/products/${id}`;
        }
        
        setLoading(true);
        setTimeout(() => {
            router.push(url);
            setLoading(false);
        }, 2000);
    };

    const handleTranferCategoryPage = () => {
        setLoading(true);
        setTimeout(() => {
            router.push(`/products`);
            setLoading(false);
        }, 2000);
    };

    const maxSlides = Math.max(0, sanpham.length - 3);

    // Hiển thị loading khi đang fetch data
    // if (loading && sanpham.length === 0) {
    //     return <LoadingPage />;
    // }

    return (
        <>
            {loading && <LoadingPage />}
            <div className="mt-16 relative">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
                
                <div className="relative p-8 lg:p-12">
                    <div className="flex lg:flex-row gap-8">
                        {/* Left Content */}
                        <div className="lg:w-1/4 flex flex-col justify-center text-center lg:text-left">
                            <div className="mb-8">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                                    Sản phẩm
                                </h2>
                                <h3 className="text-2xl lg:text-3xl font-light text-blue-100 mb-4">
                                    Có giảm giá
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto lg:mx-0 rounded-full"></div>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-blue-100/90 text-lg leading-relaxed">
                                    Khám phá các sản phẩm được chọn lọc đặc biệt với mức giá ưu đãi tốt nhất
                                </p>
                                
                                <button 
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
                                    onClick={handleTranferCategoryPage}
                                >
                                    <span>Xem tất cả</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Products */}
                        <div className="lg:w-3/4 relative">
                            {/* Hiển thị thông báo lỗi hoặc không có sản phẩm */}
                                <>
                                    <div className="overflow-hidden">
                                        <div
                                            className="flex transition-all duration-700 ease-out"
                                            style={{
                                                transform: `translateX(-${current * (280 + 16)}px)`,
                                                gap: "16px",
                                            }}
                                            onMouseEnter={() => setIsAutoPlaying(false)}
                                            onMouseLeave={() => setIsAutoPlaying(true)}
                                        >
                                            {sanpham.map((item: data, index: number) => (
                                                <div 
                                                    key={`${item._id}-${index}`}
                                                    className="flex-shrink-0 w-70 group cursor-pointer"
                                                    onClick={() => handleTranferPage(item._id, item.category)}
                                                >
                                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 h-full shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20 relative overflow-hidden">
                                                        {/* Discount Badge */}
                                                        {item.discount > 0 && (
                                                            <div className="absolute top-4 left-4 z-10">
                                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                                    -{item.discount}%
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Action Buttons */}
                                                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                            <button 
                                                                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors shadow-lg"
                                                                aria-label="Thêm vào yêu thích"
                                                                title="Thêm vào yêu thích"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // Handle add to wishlist
                                                                }}
                                                            >
                                                                <Heart className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors shadow-lg"
                                                                aria-label="Xem nhanh sản phẩm"
                                                                title="Xem nhanh sản phẩm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // Handle quick view
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Product Image */}
                                                        <div className="relative mb-4 mt-2">
                                                            <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                                                                <img 
                                                                    src={item.image} 
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.src = '/placeholder-image.png';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Product Info */}
                                                        <div className="space-y-3">
                                                            <h4 className="text-gray-800 font-medium text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                                {item.name}
                                                            </h4>

                                                            {/* Rating */}
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star 
                                                                            key={i} 
                                                                            className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-xs text-gray-500">({item.rating})</span>
                                                            </div>

                                                            {/* Price */}
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-lg font-bold text-gray-900">
                                                                        ${(item.price - (item.price * item.discount / 100))}
                                                                    </span>
                                                                    {item.discount > 0 && (
                                                                        <span className="text-sm text-gray-500 line-through">
                                                                            ${item.price}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <button 
                                                                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transform hover:scale-110 transition-all duration-300 shadow-md"
                                                                    aria-label="Thêm vào giỏ hàng"
                                                                    title="Thêm vào giỏ hàng"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        // Handle add to cart
                                                                    }}
                                                                >
                                                                    <ShoppingCart className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation Buttons - Only show if there are products */}
                                    {sanpham.length > 3 && (
                                        <div className="flex items-center justify-center mt-8 gap-4">
                                            {/* <button
                                                onClick={handlePrev}
                                                disabled={current === 0}
                                                className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 transition-all duration-300 shadow-lg"
                                                aria-label="Sản phẩm trước"
                                                title="Sản phẩm trước"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button> */}

                                            {/* Dots Indicator */}
                                            <div className="flex gap-2 overflow-hidden">
                                                {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setCurrent(index);
                                                            setIsAutoPlaying(false);
                                                        }}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                            current === index 
                                                                ? 'bg-yellow-400 w-8' 
                                                                : 'bg-white/40 hover:bg-white/60'
                                                        }`}
                                                        aria-label={`Chọn sản phẩm số ${index + 1}`}
                                                        title={`Chọn sản phẩm số ${index + 1}`}
                                                    />
                                                ))}
                                            </div>

                                            {/* <button
                                                onClick={handleNext}
                                                disabled={current === maxSlides}
                                                className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 transition-all duration-300 shadow-lg"
                                                aria-label="Sản phẩm tiếp theo"
                                                title="Sản phẩm tiếp theo"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button> */}
                                        </div>
                                    )}
                                </>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};