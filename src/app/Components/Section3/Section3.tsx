"use client"
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

export const Section3 = () => {
    const data = [
        {
            image: "/image/Section/Section3/product1_section3.png",
            title: "AccessLogitech G502 Gaming Mouseories",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "50%",
        },
        {
            image: "/image/Section/Section3/product2_section3.png",
            title: "NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Resistant Design",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "30%",
        },
        {
            image: "/image/Section/Section3/product3_section3.png",
            title: "Apple Watch Series 7 (GPS, 41MM) ",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "20%",
        },
        {
            image: "/image/Section/Section3/item4_section3.png",
            title: "Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "10%",
        },
        {
            image: "/image/Section/Section3/product1_section3.png",
            title: "AccessLogitech G502 Gaming Mouseories",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "50%",
        },
        {
            image: "/image/Section/Section3/product2_section3.png",
            title: "NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Resistant Design",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "30%",
        },
        {
            image: "/image/Section/Section3/product3_section3.png",
            title: "Apple Watch Series 7 (GPS, 41MM) ",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "20%",
        },
        {
            image: "/image/Section/Section3/item4_section3.png",
            title: "Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)",
            price_1: "$38.00",
            price_2: "$19.00",
            discount: "10%",
        }
    ];

    const [current, setCurrent] = useState(0);

    const handlePrev = () => {
        setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="section3 mt-[56px] bg-[#063A88] rounded-[10px]">
                <div className="inner_wrap flex relative ">
                    <div className="content w-[20%]">
                        <h2 className="title items-center text-center mt-[60px] ">
                            <span className="text-white font-[500] text-[24px] ">Products On Sale</span>
                            <span className="text-white font-[300] text-[24px] flex justify-center "> Shop Now!</span>
                        </h2>
                        <div className="description mt-[80px] flex justify-center items-center">
                            <button className="view_all flex gap-[2px] text-white text[16px] font-[600] " >
                                View all <FaArrowRight className="" />
                            </button>
                        </div>
                    </div>
                    <div className="product flex justify-between items-center w-[80%] my-[44px] mr-[20px] overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500"
                            style={{
                                transform: `translateX(-${current * 260}px)`, // 250px width + 10px gap
                                gap: "10px",
                            }}
                        >
                            {data.map((item, index) => (
                                <div className="product_item_wrap w-[250px] h-[300px] bg-white relative rounded-[10px] hover:bg-amber-50 group" key={index}>
                                    <div className="discount absolute w-[50px] h[23px] bg-[#FDDBC9] text-[#F45E0C] rounded-br-[8px] rounded-tr-[8px] mt-[8px] "> - {item.discount}</div>
                                    <div className="image w-[200px] h-[150px] mt-[12px] mx-[8px] ">
                                        <img src={item.image} alt="" className="w-[100%] h-[100%]" />
                                    </div>
                                    <div className="title mb-[8px] ml-[8px] ">
                                        <div className="name_product text-[20px] font-[300] text-[#0C0C0C]  mt-[12px] group-hover:text-[blue]  ">{item.title}</div>
                                        <div className="price absolute bottom-0 w-[90%] flex justify-between mr-[8px]">
                                            <s className="text-[20px] font-[400] text-[#717171]">{item.price_1}</s>
                                            <span className="price_2 text-[20px] font-[400] text-[#0C0C0C]">{item.price_2}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="btn absolute bottom-0 right-0 translate-x-[-50%] flex gap-[20px] mb-[5px] ">
                        <button title="Previous" aria-label="Previous" onClick={handlePrev}>
                            <CiCircleChevLeft className="w-[32px] h-[32px] bg-[#F6F6F6] rounded-[100%]" />
                        </button>
                        <button title="Next" aria-label="Next" onClick={handleNext}>
                            <CiCircleChevRight className="w-[32px] h-[32px]  bg-[#F6F6F6] rounded-[100%]" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};