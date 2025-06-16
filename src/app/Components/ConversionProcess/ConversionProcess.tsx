"use client"
import { CiShoppingBasket, CiDeliveryTruck } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const ConversionProcess = () => {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0); // 0: chưa tiến, 100: hoàn thành

    useEffect(() => {
        // Khi vào trang /PurchaseOrder thì chạy hiệu ứng tiến trình
        if (pathname === "/PurchaseOrder") {
            setProgress(0);
            // Chạy hiệu ứng tăng dần
            const timer = setTimeout(() => setProgress(100), 100); // delay nhỏ để kích hoạt transition
            return () => clearTimeout(timer);
        } else {
            setProgress(0);
        }
    }, [pathname]);

    return (
        <div className="flex items-center text-center justify-center">
            <div className="w-[72px] h-[72px] rounded-[50%] border-[3px] border-[#0C68F4] text-center items-center flex justify-center">
                <CiShoppingBasket className="w-[48px] h-[48px] text-[#0C68F4]" />
            </div>
            <div className="process flex items-center">
                {/* Thanh đã hoàn thành */}
                <div
                    className="process1 w-[150px] h-[1px] bg-[#78ABF9] transition-all duration-700"
                ></div>
                {/* Thanh chuyển động */}
                <div
                    className="process2 h-[1px] bg-[#78ABF9] transition-all duration-700"
                    style={{
                        width: `${progress}%`,
                        maxWidth: "100px",
                        minWidth: "0px",
                        background: "#78ABF9",
                    }}
                ></div>
                {/* Thanh chưa hoàn thành */}
                <div
                    className="h-[1px] bg-[#9E9E9E] transition-all duration-700"
                    style={{
                        width: `${100 - progress}%`,
                        maxWidth: "100px",
                        minWidth: "0px",
                    }}
                ></div>
            </div>
            <div
  className={`w-[48px] h-[48px] rounded-[50%] flex justify-center items-center frame transition-colors duration-700`}
  style={{
    background: progress === 100 ? "white": "#9E9E9E" ,
    width: progress === 100 ? "72px" : "48px",
    height: progress === 100 ? "72px" : "48px",
    border: progress === 100 ? "3px solid #0C68F4" : "3px solid white",
  }}
>
  <CiDeliveryTruck
    className="w-[32px] h-[32px] icon transition-colors duration-700"
    style={{
      color: progress === 100 ? "#0C68F4" : "#FFFFFF99", // trắng đậm khi hoàn thành, trắng nhạt khi chưa
      width: progress === 100 ? "48px" : "32px",
      height: progress === 100 ? "48px" : "32px",
    }}
  />
</div>
        </div>
    );
};