export const Section4 =() =>{
    const schedule= [
        {
            ngay: 8 , 

        },
        {
            ngay: 8 , 
            
        },
        {
            ngay: 8 , 
            
        },
        {
            ngay: 8 , 
            
        }
    ]
    return (
        <>
            <div className="inner_wrap mt-[48px] flex gap-[24px]">
                <div className="content_1 flex bg-gradient-to-r from-[#1975B9] via-[#1FB6CF] to-[#B0E9C9] rounded-[8px] w-[70%] ">
                    <div className="left w-[60%] mt-[24px]">
                        <h2 className="title text-white text-[25px] font-[500]  items-center text-center mb-[40px] p-0 w-[100%]">
                            Iphone 15 Series
                        </h2>
                        <div className="image mb-[26px] ml-[24px] w-[100%] "  > 
                            <img src="/image/Section4/image 187.png" alt="" />   
                        </div>

                        
                    </div>
                    <div className="right mt-[44px] w-[40%]">
                        <div className="schedule flex flex-wrap gap-[16px] mb-[30px]" >
                            {
                                schedule.map((item, index) => (
                                    <div className="item_schedule w-[49px] h-[46px] border-[#0C0C0C] border-[1px] rounded-t-[8px] text-center" key={index}>
                                        <div className="date">{item.ngay}</div>
                                        <div className="title">Days</div>
                                    </div>
                                ))
                            }
                        </div>
                        <h2 className="title">
                            <div className="main text-[#0C0C0C] text-[25px] font-[500] mb-[7px]">
                                It feels good to be the first
                            </div>
                            <div className="description text-[#2D2D2D] text-[16px] font-[300] mb-[25px]">
                                Get ready for the future of smartphones.Experience innovation like never before. Stay tuned for the big iPhone 15 pre-sale.
                            </div>
                        </h2>
                        <button className="register w-[134px] h-[48px] text-white rounded-[8px] bg-[#0C68F4] text-center items-center button_add_cart ">Register Now</button>
                    </div>
                </div>
                <div className="content_2 relative  w-[30%] bg-[#005690] rounded-[8px] ">
                    <div className="title_main w-[100%] text-center mt-[32px] text-[#FCC870] font-[500] text-[25px]">
                        Play Station 5
                    </div>
                    <div className="images relative mt-[100px] flex  ">
                        <div className="title text-[#005690] font-[500] text-[20px] z-999 absolute top-[100px] left-[35px]  ">Digital Edition + 2TB</div>
                        <img src="/image/Section4/ps53.png" alt="" className="z-999 absolute right-[10px] top-[-10px] "/>
                        <img src="/image/Section4/Ellipse 449.png" alt=""  className="absolute bottom-[-243px] overflow-hidden rounded-b-[8px]"/>
                    </div>
                    <div className="btn absolute bottom-[20px] left-[50%] translate-x-[-50%] w-[100%] text-center">
                        <button className=" button_add_cart w-[148px] h-[46px] bg-[#0C68F4] rounded-[8px] text-center text-[16px] text-[#FFFFFF] font-[400px] button_add_cart">Buy Now</button>
                    </div>
                </div>
            </div>

        </>
    )
}