export const Section1=()=>{
    return (
        <>
            <div className="section1 ">
                <div className="inner_wrap  flex">
                    <div className="content w-[40%] ml-[20px]">
                        <h2 className="title   text-[#042352]">
                            <div className="title_main mb-[50px] font-[700] text-[64px]">
                                Anh em Rọt
                            </div>
                            <div className="description mb-[110px] font-[500] text-[32px] flex ">
                                join the <p className="text-[#F45E0C] mx-[10px]"> digital revolution </p> with us
                            </div>
                        </h2>
                        <button
                            className="btn text-[#FFFFFF] font-[500] text-[20px] w-[300px] h-[60px] bg-[#F45E0C] rounded-[10px] flex justify-center items-center button_add_cart"
                            onClick={() => window.location.href = "/products"}
                        >
                            Explore More
                        </button>
                        
                    </div>
                    <div className="image w-[60%] h-[443px] flex justify-center items-center relative">
                        <img src="/image/Section/Section1/section1.png" className="w-[728px] h-[443px] absolute left-[100px]" alt="" />

                    </div>

                </div>
            </div>
        </>
    )
}