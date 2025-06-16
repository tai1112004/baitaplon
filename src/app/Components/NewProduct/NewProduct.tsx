import { TfiArrowCircleRight } from "react-icons/tfi";
export const NewProduct = () => {

    const title = "New Products";
        const data = [
        {
            image: "/image/Section/Section3/product1_section3.png",
            title: "AccessLogitech G502 Gaming Mouseories",
            price_1:"$38.00" ,
            price_2:"$19.00",
            discount:"50%",
            rate : 4.5,
        },
        {
            image: "/image/Section/Section3/product2_section3.png",
            title: "NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Resistant Design",
            price_1:"$38.00" ,
            price_2:"$19.00",
            discount:"30%",
            rate : 4.5,
        },
        {
            image: "/image/Section/Section3/product3_section3.png",
            title: "Apple Watch Series 7 (GPS, 41MM) "    ,
            price_1:"$38.00" ,
            price_2:"$19.00",
            discount:"20%",
            rate : 4.5,


        },
        {
            image: "/image/Section/Section3/item4_section3.png",
            title: "Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)",
            price_1:"$38.00" ,
            price_2:"$19.00",
            discount:"10%",
            rate : 4.5,

        }
    ]
    return (
        <>
             <div className="inner-wrap mt-[60px] ">
                <div className="title flex justify-between items-center ">
                    <h2 className=" text-[32px] font-[600]  text-[#0C0C0C]">{title}</h2>
                    <button className="flex gap-[10px] items-center">View ALL <TfiArrowCircleRight /></button>

                </div>
                <div className="w-[100%] bg-[#B4B4B4] mt-[16px] h-[1px] mb-[10px]"></div>
                <div className="product mt-[32px] flex justify-between items-center w-[100%]">
                    {
                        data.map((item, index:number) =>(
                            <>
                                <div className="product_item_wrap w-[288px] h-[400px] border-[#7171711F] border-[1px]  rounded-[8px] relative" key={index}>
                                    <div className="image w-[256px] h-[190px] mx-[16px] my-[16px]">
                                        <img src={item.image} alt="" className="w-[100%] h-[100%]"/>

                                    </div>
                                    <div className="w-[256px] mx-[16px] h-[1px] bg-[#101010B2]"></div>
                                    <div className="title mt-[16px] mx-[16px]">
                                        <div className="name_product text-[20px] font-[300] ">
                                            {item.title}
                                        </div>
                                        <div className="price_rate flex justify-between items-center absolute bottom-[0px] w-[90%] ">
                                            <div className="price font-[300] text-[20px]">{item.price_2}</div>
                                            <div className="rate text-[20px] font-[500] text-[#063A88]">{item.rate}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                                   
                    ))}
                    
                </div>
             </div>
        </>
    )
}