"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "../notification/loading";
export const Section2 = () => {
    const data = [
        {
            image: "/image/Section/Section2/tablet.jpg" ,
            title: "Tablet",
            link: "/products/tablets",
            gradient: "from-blue-500 to-purple-600"
        },
        {
            image: "/image/Section/Section2/mayanh.png",
            title: "Camera",
            link: "/products/camera",
            gradient: "from-green-500 to-teal-600"
        },
        {
            image: "/image/Section/Section2/manhinh.png",
            title: "Laptop",
            link: "/products/laptopAndComputer",
            gradient: "from-orange-500 to-red-600"
        },
        {
            image: "/image/Section/Section2/dienthoaireal.png",
            title: "Phone",
            link: "/products/mobilePhone",
            gradient: "from-pink-500 to-rose-600"
        },
        {
            image: "/image/Section/Section2/image.png",
            title: "Smart Watch",
            link: "/products/wearables",
            gradient: "from-indigo-500 to-blue-600"
        },
        {
            image: "/image/Section/Section2/tainghe.jpg",
            title: "Audio",
            link: "/products/audio",
            gradient: "from-yellow-500 to-orange-600"
        },
    ];
    const [loading,setloading] = useState(false);
    const router = useRouter();
    const handleClick = (link:string) =>{
        setloading(true) ; 
        setTimeout(() => {
            router.push(link) ; 
        }, 2000);
    }

    return (
        <>
        {loading && <LoadingPage/>}
        <div className="section2 mt-16 px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Explore Our Categories
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover amazing products across different categories, carefully curated for your needs
                </p>
            </div>

            {/* Products Grid */}
            <div className="product_wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {data.map((item, index) => (
                    <div onClick={()=>handleClick(item.link)} key={index} className="group">
                        <div className="product_item_wrap relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                            {/* Gradient Background Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            
                            {/* Image Container */}
                            <div className="product_item_image relative p-6 flex justify-center items-center">
                                <div className="relative">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <div className="product_item_title px-4 pb-6">
                                <h3 className="text-gray-800 font-semibold text-sm md:text-base text-center group-hover:text-gray-900 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                
                                {/* Animated Underline */}
                                <div className={`h-0.5 bg-gradient-to-r ${item.gradient} mx-auto mt-2 w-0 group-hover:w-8 transition-all duration-300`}></div>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA Section */}
            <div className="text-center mt-16">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={()=>handleClick("/products")}>
                    <span>View All Products</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
        </>
        
        
    );
};