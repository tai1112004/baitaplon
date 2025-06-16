import Link from "next/link" 

export const Section2 =()=>{
    const data = [
        {
            image: "/image/Section/Section2/dienthoai.png",
            title: "Tablet",
            link : "/products/tablets"

        },
        {
            image: "/image/Section/Section2/mayanh.png",
            title: "Camera",
            link: "/products/camera" , 
        },
        {
            image: "/image/Section/Section2/manhinh.png",
            title: "laptop "    ,
            link : "/products/laptopAndComputer" , 
        },
        {
            image: "/image/Section/Section2/dienthoaireal.png",
            title: "Phone",
            link : "/products/mobilePhone" , 
        },
        {
            image: "/image/Section/Section2/image.png",
            title: "Samrt watch",
            link : "/products/wearables" ,
        },
        {
            image: "/image/Section/Section2/image.png",
            title: "Audio",
            link : "/products/audio" ,
        },
       
    ];
    return (
        <>
            <div className="section2 mt-[60px]">
                <div className="product_wrap flex justify-between items-center  ">
              
                        {
                            data.map((item, index) =>(
                                <>
                                <Link href={item.link}>
                                    <div className="product_item_wrap border-[1px] border-[#E5E5E5] rounded-[10px] group " key={index}>
                                    <div className="product_item_image my-[18px] mx-[8px]  rounded-[10px] flex justify-center items-center">
                                        <img src={item.image} alt="" className="w-[148px] h-[148px]" />
                                    </div>
                                    <div className="product_item_title text-[#2D2D2D] font-[300] text-[16px] mt-[8px] items-center flex justify-center ">{item.title}</div>
                                </div>

                                </Link>
                                    
                                </>
                            ))
                        }
                    </div>

                   
                </div>
        </>
    )
}