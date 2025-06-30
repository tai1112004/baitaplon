"use client";
import { BoxChat } from "../BoxChat/BoxChat";
import { useState, useCallback, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Filter, SortAsc } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { AddCartPage } from "../notification/addCart";
import { WrongPage } from "../notification/wrong";
import { NullPage } from "../notification/null";
const LoadingThreeDotsJumping = () => (
  <div className="flex space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
  </div>
);
const PageNull = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <NullPage />
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm bạn cần</h3>
    <p className="text-gray-500 mb-6">Hãy tìm sản phẩm khác nhé</p>
    </div>
)
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
interface ItemsSearch {
    name: string | null;
    id: string | null;
}
type Props = {
    data_products: { products: data[] };
}
export const Products = ({data_products}: Props) => {
    const products = data_products?.products || [];
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('price_asc');
    const [favorites, setFavorites] = useState(new Set());
    const router = useRouter() ; 
    const [wrong , setWrong] = useState(false);
    const [success,setSuccess] = useState(false) ; 
    const [sanpham, setsanpham] = useState<data[]>([]);
    const data_wrong =  
    {
        title : "Bạn chưa đăng nhập" 
    }
    const data_success =
    {
        title : "Đã thêm vào giỏ hàng thành công" 
    }
    const [data, setData] = useState<ItemsSearch[]>([]);
    const [filters, setFilters] = useState({
        brand: [] as string[],
        color: [] as string[],
        ram: [] as string[],
        processor: [] as string[],
        gpuBrand: [] as string[],
        driveSize: [] as string[]
    });
    // const [isClient, setIsClient] = useState(false);
    useEffect(() => {
         let url = "https://ecommerce-django-production-6256.up.railway.app/api/products/?";
        if (filters.ram.length > 0) {
            const ramValues = filters.ram.map(ram => ram.replace(' GB', ''));
            url += `ram=${ramValues.join('&ram= ')}&`;
        }
        if (filters.processor.length > 0) {
            url += `processor=${filters.processor.join('&processor=')}&`;
        }
        if (filters.gpuBrand.length > 0) {
            url += `gpu_brand=${filters.gpuBrand.join('&gpu_brand=')}&`;
        }
        if (filters.driveSize.length > 0) {
            const dirverSizeValues = filters.ram.map(ram => ram.replace(' GB', ''));
            
            url += `drive_size=${dirverSizeValues.join('&drive_size=')}&`;
        }
        const fetchData = async () => {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(res.status===500)
            {
                setLoading(true);

            }
            else if(res.status===200)
            {
                const data = await res.json();
                setsanpham(data.products);
                setLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    // useEffect(() => {
    //     setIsClient(true);
    // }, [isClient]);
    // ✅ Cải thiện useEffect với kiểm tra an toàn hơn
    useEffect(() => {
        
        // Kiểm tra kỹ hơn
        if (data_products && Array.isArray(products) && products.length > 0) {
            setsanpham(products);
        } else {
            // Nếu không có dữ liệu, đặt mảng rỗng
            setsanpham([]);
        }
    }, [products, data_products]);
     
    const handleClickTransferPage = useCallback((id:number , category:number) => {
        let url:string  ;
        if(category===3) 
        {
            url = `/products/mobilePhones/${id}` ;
        }
        else if(category===1)
        {
            url = `/products/laptopAndComputer/${id}` ;
        }
        else if(category===4)
        {
            url = `/products/tablets/${id}` ;
        }
        else if(category===6)
        {
            url = `/products/audio/${id}` ;
        }
        else if(category ===7)
        {
            url = `/products/cameras/${id}` ;
        }
        else if(category===5)
        {
            url = `/products/wearables/${id}` ;
        }
        else if(category===2)
        {
            url = `/products/gaming/${id}` ;
        }
        else if(category===8)
        {
            url = `/products/networking/${id}` ;
        }
        setLoading(true);
        setTimeout(() => {
            router.push(url) ; 
        }, 1000);
    }, [router,setLoading]);
    useEffect(() => {
    const sortedProducts = [...products]; 
    if (sortBy === "price_asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount_asc") {
        sortedProducts.sort((a, b) => a.discount - b.discount);
    } else if (sortBy === "discount_desc") {
        sortedProducts.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === "rate_asc") {
        sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "rate_desc") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setsanpham(sortedProducts);
}, [sortBy, products]);
    const toggleFavorite = (id:number) => {
        console.log(id) ; 
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const renderStars = (rating:number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : index < rating
                        ? 'fill-yellow-200 text-yellow-400'
                        : 'text-gray-300'
                }`}
            />
        ));
    };
    

    // Map category names to filter keys
    const getCategoryFromName = (name: string): keyof typeof filters | null => {
        const brandOptions = ['Asus', 'Acer', 'Apple', 'Dell'];
        const colorOptions = ['black', 'white', 'pink', 'silver'];
        const ramOptions = ['32 GB', '16 GB', '12 GB', '8 GB'];
        const processorOptions = ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 9'];
        const gpuOptions = ['NVIDA', 'Intel', 'AMD', 'Apple'];
        const driveOptions = ['512 GB', '256 GB', '64 GB', '128 GB'];

        if (brandOptions.includes(name)) return 'brand';
        if (colorOptions.includes(name)) return 'color';
        if (ramOptions.includes(name)) return 'ram';
        if (processorOptions.includes(name)) return 'processor';
        if (gpuOptions.includes(name)) return 'gpuBrand';
        if (driveOptions.includes(name)) return 'driveSize';
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, id, checked } = e.target;
        console.log("e.target.name", name);
        console.log("e.target.checked", checked);

        const category = getCategoryFromName(name);
        
        if (checked) {
            // Add to data array
            const newItem: ItemsSearch = { name, id };
            setData(prev => [...prev, newItem]);
            
            // Add to filters
            if (category) {
                setFilters(prev => ({
                    ...prev,
                    [category]: [...prev[category], name]
                }));
            }
        } else {
            // Remove from data array
            setData(prev => prev.filter(item => item.name !== name));
            
            // Remove from filters
            if (category) {
                setFilters(prev => ({
                    ...prev,
                    [category]: prev[category].filter(item => item !== name)
                }));
            }
        }
           
            
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const itemName = e.currentTarget.previousElementSibling?.textContent;
        const itemId = e.currentTarget.name;
        
        // Uncheck the checkbox
        const checkbox = document.getElementById(itemId) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = false;
        }
        
        if (itemName) {
            // Remove from data array
            setData(prev => prev.filter(item => item.name !== itemName));
            
            // Remove from filters
            const category = getCategoryFromName(itemName);
            if (category) {
                setFilters(prev => ({
                    ...prev,
                    [category]: prev[category].filter(item => item !== itemName)
                }));
            }
        }
    };

    const handleClick_clear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // Clear data array
        setData([]);
        
        // Clear filters
        setFilters({
            brand: [],
            color: [],
            ram: [],
            processor: [],
            gpuBrand: [],
            driveSize: []
        });
        
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = false;
        });
    };

    // Debug: Log current state
    const handleClickAddCart=(id:number)=>{
        const token = getCookie("token") ; 
        if(token)
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
            setSuccess(true) ; 
            setTimeout(() => {
                setSuccess(false) ; 
                
            }, 1700);
            window.dispatchEvent(new Event("cart-updated"));
        }
        else
        {
            setWrong(true) ; 
            setTimeout(()=>{
                setWrong(false) ;
            },1800) 
        }

    }
    return (
        <>
        {
            success && (
                <AddCartPage data = {data_success} />
            )
        }
        {
            wrong && (
                <WrongPage data={data_wrong} /> 
            )
        }
        <div className="flex gap-[8px] flex-wrap">
                <div className="w-full">
            {/* Selected filters display */}
            <div className="flex gap-2 flex-wrap mb-4">
                {data.length > 0 &&
                    data.map((item: ItemsSearch, index: number) => (
                        <div 
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 justify-between min-w-[133px] h-10 transition-colors duration-200" 
                            key={index}
                        >
                            <div className="text-sm font-semibold text-gray-900 truncate">
                                {item.name}
                            </div>
                            <button 
                                onClick={handleClick} 
                                name={item.id ?? ''} 
                                aria-label="Xóa bộ lọc"
                                className="text-gray-500 hover:text-red-500 font-bold text-lg leading-none transition-colors duration-200 flex-shrink-0"
                            >
                                ×
                            </button>
                        </div>
                    ))
                }
            </div>
                <div  className="flex mb-[4px]">
                    <div className="flex gap-8 mt-5 relative w-20%">
                        <form className="mt-10 w-72 flex flex-col gap-5 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-medium text-black">Filters</div>
                                <button 
                                    className="text-base font-normal text-blue-600 hover:text-red-500 transition-colors duration-200" 
                                    onClick={handleClick_clear}
                                    type="button"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Brand */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">Brand</div>
                                <div className="space-y-2">
                                    {['Asus', 'Acer', 'Apple', 'Dell'].map((brand) => (
                                        <div className="flex items-center" key={brand}>
                                            <input 
                                                type="checkbox" 
                                                id={`${brand}-checkbox`} 
                                                name={brand} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${brand}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                            >
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Color */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">Color</div>
                                <div className="space-y-2">
                                    {['black', 'white', 'pink', 'silver'].map((color) => (
                                        <div className="flex items-center" key={color}>
                                            <input 
                                                type="checkbox" 
                                                id={`${color}-checkbox`} 
                                                name={color} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${color}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 capitalize"
                                            >
                                                {color}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RAM */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">RAM</div>
                                <div className="space-y-2">
                                    {['32 GB', '16 GB', '12 GB', '8 GB'].map((ram) => (
                                        <div className="flex items-center" key={ram}>
                                            <input 
                                                type="checkbox" 
                                                id={`${ram.replace(' ', '')}-checkbox`} 
                                                name={ram} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${ram.replace(' ', '')}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                            >
                                                {ram}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Processor */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">Processor</div>
                                <div className="space-y-2">
                                    {['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 9'].map((processor) => (
                                        <div className="flex items-center" key={processor}>
                                            <input 
                                                type="checkbox" 
                                                id={`${processor.replace(/\s+/g, '')}-checkbox`} 
                                                name={processor} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${processor.replace(/\s+/g, '')}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                            >
                                                {processor}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* GPU Brand */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">GPU Brand</div>
                                <div className="space-y-2">
                                    {['NVIDA', 'Intel', 'AMD', 'Apple'].map((gpu) => (
                                        <div className="flex items-center" key={gpu}>
                                            <input 
                                                type="checkbox" 
                                                id={`${gpu}-checkbox`} 
                                                name={gpu} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${gpu}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                            >
                                                {gpu}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Drive Size */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="pb-3 text-lg font-light text-gray-900">Drive Size</div>
                                <div className="space-y-2">
                                    {['512 GB', '256 GB', '128 GB', '64 GB'].map((drive) => (
                                        <div className="flex items-center" key={drive}>
                                            <input 
                                                type="checkbox" 
                                                id={`${drive.replace(' ', '')}-checkbox`} 
                                                name={drive} 
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label 
                                                htmlFor={`${drive.replace(' ', '')}-checkbox`}
                                                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                            >
                                                {drive.replace(' GB', 'GB')}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>

                    </div>

                    <div className="w-[80%]">
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
            {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                        <LoadingThreeDotsJumping />
                        <p className="mt-4 text-gray-600 text-center">Đang tải...</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}

                {/* Controls Section */}
                <div className="flex  md:flex-row  items-center mb-6 gap-4 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Filter className="w-5 h-5" />
                            <span className="font-medium">Bộ lọc</span>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-full shadow-sm border text-sm text-gray-600">
                            { products&&products.length} sản phẩm
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <SortAsc className="w-5 h-5 text-gray-600" />
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            aria-label="Sắp xếp sản phẩm"
                        >
                            <option value="price_asc">Giá: Thấp đến Cao</option>
                            <option value="price_desc">Giá: Cao đến Thấp</option>
                            <option value="discount_asc">Giảm giá: Thấp đến Cao</option>
                            <option value="discount_desc">Giảm giá: Cao đến Thấp</option>
                            <option value="rate_asc">Đánh giá: Thấp đến Cao</option>
                            <option value="rate_desc">Đánh giá: Cao đến Thấp</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sanpham.length>0 ? 
                        sanpham.map((item, index) => (
                            <div 
                                key={index} 
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                                onClick={() => handleClickTransferPage(item._id,item.category)}
                            >
                                {/* Discount Badge */}
                                {item.discount > 0 && (
                                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        -{item.discount}%
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(item._id);
                                    }}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
                                    aria-label={favorites.has(item._id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                    title={favorites.has(item._id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                >
                                    <Heart 
                                        className={`w-5 h-5 transition-colors duration-200 ${
                                            favorites.has(item._id) 
                                                ? 'fill-red-500 text-red-500' 
                                                : 'text-gray-400 hover:text-red-500'
                                        }`}
                                    />
                                </button>

                                {/* Product Image */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-56">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                        {item.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1">
                                            {renderStars(item.rating)}
                                        </div>
                                        <span className="text-sm text-gray-600">({item.rating})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            {item.discount > 0 && (
                                                <span className="text-lg text-gray-400 line-through">
                                                    {item.price}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-gray-900">
                                                {item.price - (item.price * item.discount / 100)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation() ; 
                                            handleClickAddCart(item._id)
                                        }}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        )) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 " >
                            <PageNull />
                        </div>
                        )
                    }
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12 ">
                    <button className="px-8 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200">
                        Xem thêm sản phẩm
                    </button>
                </div>
            </div>
        </div>
                </div>
                    
                </div>
            
        </div>
                
                <BoxChat/>
                
            </div>
            
              
            
        </>
    )
}