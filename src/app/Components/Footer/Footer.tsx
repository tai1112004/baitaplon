import { MdKeyboardArrowRight } from "react-icons/md";
export const Footer = () => {
    return (
        <>
            <footer className="footer bg-[#021736] mt-[10px]  z-999">
                <div className="container mx-auto my-0 w-[1440px]  ">                                                                                
                    <div className="inner_wrap p-[50px]">
                        <div className="content_top flex justify-between  pb-[70px] border-b-[1px] border-[#F9F9F9] border-opacity-[0.1]">
                            <div className="company flex flex-col gap-[10px]">
                                <div className="title text-white font-[500] text-[16px] ">Company</div>
                                <ul className="flex flex-col gap-[10px] text-[#CBCBCB] font-[300] text-[16px]">
                                    <li>about us</li>
                                    <li>blog</li>
                                    <li>returns</li>
                                    <li>order status </li>
                                </ul>

                            </div>
                            <div className="infor flex flex-col gap-[10px] ">
                                <div className="title  text-white font-[500] text-[16px]">Info</div>
                                    <ul className=" flex flex-col gap-[10px] text-[#CBCBCB] font-[300] text-[16px]">
                                        <li>How it works?</li>
                                        <li>our promises</li>
                                        <li>FAQ</li>
                                        
                                    </ul>
                                    
                            </div>
                            
                            <div className="contact_us flex flex-col gap-[10px] ">
                                <div className="title text-white font-[500] text-[16px]">Contact Us</div>
                                <ul className="flex flex-col gap-[10px]  text-[#CBCBCB] font-[300] text-[16px] ">
                                    <li>149 Chiến Thắng - Thanh Trì - Thành Phố Hà Nội </li>
                                    <li>1922 ngày mai nói tiếp </li>
                                    <li>Học Viện Kỹ Thuật Mật Mã</li>
                                </ul>
                            </div>
                            <div className="form flex flex-col gap-[16px]">
                                <div className="title text-white font-[500] text-[16px]">Sign up for News and updates</div>
                                <form action="" className="flex gap-[10px] w-[288px] h-[50px] border-[#F9F9F9] border-[1px] rounded-[8px] justify-between">
                                    <input type="email" placeholder="nhập địa chỉ email" className="outline-none text-[#F9F9F9] font-[300] text-[16px]"/>
                                    <button title="Submit email h-[100%]"><MdKeyboardArrowRight className="h-[100%] text-[#F9F9F9]" /></button>
                                </form>
                            </div>
                        </div>
                        <div className="content_bottom flex justify-between items-center mt-[10px] ">
                            <div className="name_company text-white font-[500] text-[16px] ">Anh Em Rọt</div>
                            <div className="member text-white font-[500] text-[16px] flex gap-[20px]">
                                <div className="member_1">Ngô Minh Cường</div>
                                <div className="member_2">Lê Anh Nhật</div>
                                <div className="member_2">Hoàng Văn Tài</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}