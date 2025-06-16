"use client"
import { BsChatDots } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import {useState} from "react";
export const BoxChat =()=>{
    const dataBoxChat:any=[] ; 
    const dataChat ={
        "name":null , 
        "content": null , 
    }
    const [chat, setchat]  = useState(dataBoxChat);
    const handleClick = () => {
        console.log('Button clicked');
        const chatBox = document.getElementsByClassName('chat')[0];
        chatBox.classList.toggle('hidden'); 
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        if (input.value.trim() !== '') {
            const newMessage = {
                name: "USER", // You can replace this with the actual user's name
                content: input.value.trim(),
            };
            setchat([...chat,newMessage]) ; 
            input.value = ''; // Clear the input field after sending the message
        }
    }
    return (
        <>
            <div className="bottom-0 right-0 fixed z-50 pb-[100px]">
                <div className="boxchat   m-[20px] w-[50px] h-[50px] bg-[black] text-[white] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[blue] transition-colors duration-300  z-50 " onClick={handleClick}>
                    <BsChatDots />     
                </div>  
                <div className="chat w-[392px] h-[545px] rounded-[8px] border-[1px] border-[#F9F9F9] bg-[#FFFFFF] shadow-lg absolute bottom-[0px] right-[0px] z-50 hidden">
                    <div className="head py-[24px] px-[16px] bg-[#0C68F4] flex items-center justify-between rounded-[8px]">
                        <h2 className="p-0 text-[24px] font-[500] text-[#FFFFFF]">Nhắn Tin Với ADMIN</h2>
                        <button className="w-[32px] h-[32px] rounded-[50%] border-[1px] border-[white] text-[white] hover:text-[red] hover:border-[red] " onClick={handleClick}>x</button>
                    </div> 
                    <div className="content-chat px-[16px] pt-[24px] pb-[16px] h-[400px] overflow-y-auto w-[100%] ">
                        <p className="text-[#2D2D2D] text-[20px] font-[300]">xin chào bạn đã đến với trang web mua hàng của chúng tôi , bạn cần giúp đỡ gì , chúng tôi sẽ cố gắng trả lời bạn sớm nhất có thể</p>
                        {
                            chat.map((item: any, index: number) => (
                                item.name === "USER" ? (
                                    <div className="box flex justify-end mb-[5px]" key={index} >
                                        <div className="content text-[18px] font-[300] w-[50%] bg-[blue] text-white text-start px-[10px] py-[10px] rounded-[20px] ">{item.content}</div>
                                    </div>
                                ) : (
                                    <div className="box flex justify-start mb-[5px]" key={index} >
                                        <div className="content text-[18px] font-[300] w-[50%] bg-[#2B2B2B] text-white text-start px-[10px] py-[10px] rounded-[20px] ">{item.content}</div>
                                    </div>
                                )
                            ))
                        }
                    </div>
                    <form action="" className="flex items-center justify-between px-[16px] pb-[16px] border-t-[1px] border-[black] h-[72px]" onSubmit={handleSubmit}>
                        <input type="text" className="h-[100%] outline-none"/>
                        <button><RiSendPlaneFill className="w-[32px] h-[32px] text-[#0C68F4]"/></button>
                    </form>
                </div>
            </div>
            
        </>
    )
}