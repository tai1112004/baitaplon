import { TfiArrowCircleRight } from "react-icons/tfi";
import { SiSamsung } from "react-icons/si";
import { FaApple } from "react-icons/fa";
export const TopBrands = () => {
    return (
        <>
             <div className="inner-wrap mt-[60px]">
                <div className="title flex justify-between items-center ">
                    <h2 className=" text-[32px] font-[600]  text-[#0C0C0C]">Top Brands</h2>
                    <button className="flex gap-[10px] items-center">View ALL <TfiArrowCircleRight /></button>

                </div>
                <div className="w-[100%] bg-[#B4B4B4] mt-[16px] h-[1px] mb-[10px]"></div>
                <div className="brands mt-[32px] flex justify-between items-center w-[100%]">
                    <div className="apple"><FaApple className="w-[200px] h-[35px] text-[30px] font-[700]" /></div>
                    <div className="apple"><FaApple className="w-[200px] h-[35px] text-[30px] font-[700]" /></div>
                    <div className="apple"><FaApple className="w-[200px] h-[35px] text-[30px] font-[700]" /></div>
                    <div className="apple"><FaApple className="w-[200px] h-[35px] text-[30px] font-[700]" /></div>
                    <div className="apple"><FaApple className="w-[200px] h-[35px] text-[30px] font-[700]" /></div>
                    

                </div>
            </div>
        </>
    )
}