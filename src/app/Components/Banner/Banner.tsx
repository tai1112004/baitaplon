export const Banner =()=>{
    return (
        <>
            <div className="inner_wrap mt-[48px] flex bg-[#223949] rounded-[8px] ">
                <div className="content w-[50%] ">
                    <h2 className="title w-[100%] text-center mt-[120px] p-0">
                        <div className="main text-[white] font-[500] text-[44px]">SMART WATCH</div>
                        <div className="description mt-[16px] font-[300] text-[24px] text-[white]">Various designs and brands</div>
                    </h2>
                    <button className="btn mt-[32px] w-[200px] h-[50px] bg-[#FF6951] text-[black] font-[500] text-[20px] rounded-[8px] text-center ml-[250px] mb-[100px] button_add_cart">
                        view
                    </button>
                </div>
                <div className="imgae relative w-[50%] p-0 m-0 overflow-hidden">
                    <img src="/image/Banner/main.png" alt="" className="imgae_main absolute z-[999] top-[60px]" />
                    <img src="/image/Banner/secondary.png" alt="" className="imgae_secondary absolute  top-[0px] right-[0px] p-0 m-0" />
                </div>
            </div>
    </>
    )
}