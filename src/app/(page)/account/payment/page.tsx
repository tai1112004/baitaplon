"use client"
import { useEffect } from "react";
import { useCallback}  from "react";
export default function PaymentPage() {
    
    const handleClickCartText =useCallback(()=>{
        const popupCard = document.getElementById("popupCard") ; 
        if(popupCard) popupCard.classList.toggle("hidden");
    },[])
    const handleClickPayPalText = useCallback(() => {
        const popupPayPal = document.getElementById("popupPayPal");
        if (popupPayPal) popupPayPal.classList.toggle("hidden");
    }, []);
    return (
        <>
            <div className="">
                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Card</span>

                            <span className="p-2 text-[16px] font-light">mange payment methods</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-8 ">
                            <div className="flex">

                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                                    <p id="CardText" className="flex gap-2 text-[16px] font-light">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <span id="CardText">0123456789</span>
                                    </p>
                                    <button id="editCardBtn" className="cursor-pointer" onClick={handleClickCartText}><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                                                fill="#0C68F4" />
                                            <path
                                                d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901ZM16.5698 3.55006L8.68984 11.4301C8.49984 11.6201 8.27984 12.0601 8.23984 12.3201L7.80984 15.3301C7.76984 15.6201 7.82984 15.8601 7.97984 16.0101C8.12984 16.1601 8.36984 16.2201 8.65984 16.1801L11.6698 15.7501C11.9298 15.7101 12.3798 15.4901 12.5598 15.3001L20.4398 7.42006C21.0898 6.77006 21.4298 6.19006 21.4798 5.65006C21.5398 5.00006 21.1998 4.31006 20.4398 3.54006C18.8398 1.94006 17.7398 2.39006 16.5698 3.55006Z"
                                                fill="#0C68F4" />
                                            <path
                                                d="M19.8501 9.83003C19.7801 9.83003 19.7101 9.82003 19.6501 9.80003C17.0201 9.06003 14.9301 6.97003 14.1901 4.34003C14.0801 3.94003 14.3101 3.53003 14.7101 3.41003C15.1101 3.30003 15.5201 3.53003 15.6301 3.93003C16.2301 6.06003 17.9201 7.75003 20.0501 8.35003C20.4501 8.46003 20.6801 8.88003 20.5701 9.28003C20.4801 9.62003 20.1801 9.83003 19.8501 9.83003Z"
                                                fill="#0C68F4" />
                                            
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4 ">
                                    <img src="../img/cardPayment.png" alt="" />
                                </div>

                            </div>

                           
                            <div id="popupCard"
                                className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden ">
                                <div className="bg-white p-6 rounded-md shadow-md w-[600px] h-[414px] p-8">
                                    <h2 className="text-lg font-semibold">Add your payment method</h2>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-[16px] font-medium">
                                            Credit or debit cards
                                        </span>
                                        <span className="text-gray-500 text-[16px] font-light">
                                            Tech Heim accepts major credit and debit cards
                                            <img src="../img/cardPayment.png" alt="" />
                                        </span>

                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <input id="CardInput" type="number"
                                            className="border border-gray-300 p-2 w-full mt-2 rounded-md"
                                            placeholder="Card number" />
                                        <input id="CardNameInput" type="text"
                                            className="border border-gray-300 p-2 w-full mt-2 rounded-md"
                                            placeholder="Name on card" />
                                    </div>

                                    <div className="flex justify-between gap-5 mt-4">
                                        <input id="CardDateInput" type="text" placeholder="Expriation date (MM/YY)"
                                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}" maxLength={5}
                                            className="border border-gray-300 p-2 w-full mt-2 rounded-md"
                                        />
                                        <input id="CardCVVInput" type="text" placeholder="CVV"
                                            className="border border-gray-300 p-2 w-full mt-2 rounded-md" />
                                    </div>


                                    <div className="flex justify-end gap-2 mt-4">
                                        <button id="cancelCardBtn"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                            onClick={handleClickCartText}>Huỷ</button>
                                        <button id="saveCardBtn"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md">Lưu</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex">

                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">
                                    <p id="PayPalText" className="flex gap-2 text-[16px] font-light">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                                fill="#444444" />
                                            <path
                                                d="M13.7602 17.75H10.2302C9.13023 17.75 8.26023 17.21 7.77023 16.23L6.88023 14.44C6.67023 14.01 6.24023 13.75 5.76023 13.75H1.99023C1.58023 13.75 1.24023 13.41 1.24023 13C1.24023 12.59 1.59023 12.25 2.00023 12.25H5.76023C6.81024 12.25 7.75024 12.83 8.22023 13.77L9.11023 15.56C9.34023 16.02 9.71023 16.25 10.2302 16.25H13.7602C14.2402 16.25 14.6702 15.99 14.8802 15.56L15.7702 13.77C16.2402 12.83 17.1802 12.25 18.2302 12.25H21.9702C22.3802 12.25 22.7202 12.59 22.7202 13C22.7202 13.41 22.3802 13.75 21.9702 13.75H18.2302C17.7502 13.75 17.3202 14.01 17.1102 14.44L16.2202 16.23C15.7502 17.17 14.8102 17.75 13.7602 17.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M13.6701 7.75H10.3401C9.92008 7.75 9.58008 7.41 9.58008 7C9.58008 6.59 9.92008 6.25 10.3301 6.25H13.6601C14.0701 6.25 14.4101 6.59 14.4101 7C14.4101 7.41 14.0801 7.75 13.6701 7.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M14.5 10.75H9.5C9.09 10.75 8.75 10.41 8.75 10C8.75 9.59 9.09 9.25 9.5 9.25H14.5C14.91 9.25 15.25 9.59 15.25 10C15.25 10.41 14.91 10.75 14.5 10.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <span id="PayPalText"> 123456789</span>

                                    </p>
                                    <button id="editPayPalBtn" className="cursor-pointer" onClick={handleClickPayPalText}><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                                                fill="#0C68F4" />
                                            <path
                                                d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901ZM16.5698 3.55006L8.68984 11.4301C8.49984 11.6201 8.27984 12.0601 8.23984 12.3201L7.80984 15.3301C7.76984 15.6201 7.82984 15.8601 7.97984 16.0101C8.12984 16.1601 8.36984 16.2201 8.65984 16.1801L11.6698 15.7501C11.9298 15.7101 12.3798 15.4901 12.5598 15.3001L20.4398 7.42006C21.0898 6.77006 21.4298 6.19006 21.4798 5.65006C21.5398 5.00006 21.1998 4.31006 20.4398 3.54006C18.8398 1.94006 17.7398 2.39006 16.5698 3.55006Z"
                                                fill="#0C68F4" />
                                            <path
                                                d="M19.8501 9.83003C19.7801 9.83003 19.7101 9.82003 19.6501 9.80003C17.0201 9.06003 14.9301 6.97003 14.1901 4.34003C14.0801 3.94003 14.3101 3.53003 14.7101 3.41003C15.1101 3.30003 15.5201 3.53003 15.6301 3.93003C16.2301 6.06003 17.9201 7.75003 20.0501 8.35003C20.4501 8.46003 20.6801 8.88003 20.5701 9.28003C20.4801 9.62003 20.1801 9.83003 19.8501 9.83003Z"
                                                fill="#0C68F4" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-8"><img src="../img/paypal.png" alt="" /></div>
                            </div>
                            
                            <div id="popupPayPal"
                                className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden">
                                <div className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]">
                                    <h2 className="text-lg font-semibold">Edit PayPal</h2>
                                    <input id="PayPalInput" type="text" className="border p-2 w-full mt-2 rounded-md"
                                        placeholder="Nhập PayPal mới..." />
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button id="cancelPayPalBtn"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleClickPayPalText}>Huỷ</button>
                                        <button id="savePayPalBtn"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md">Lưu</button>
                                    </div>
                                </div>
                            </div>




                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Instalments</span>

                            <a href="#"><span
                                    className="p-2 text-[16px] font-[400] text-primary-400 flex gap-2 items-center">mange
                                    your
                                    instalments <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.4301 18.8201C14.2401 18.8201 14.0501 18.7501 13.9001 18.6001C13.6101 18.3101 13.6101 17.8301 13.9001 17.5401L19.4401 12.0001L13.9001 6.46012C13.6101 6.17012 13.6101 5.69012 13.9001 5.40012C14.1901 5.11012 14.6701 5.11012 14.9601 5.40012L21.0301 11.4701C21.3201 11.7601 21.3201 12.2401 21.0301 12.5301L14.9601 18.6001C14.8101 18.7501 14.6201 18.8201 14.4301 18.8201Z"
                                            fill="#0C68F4" />
                                        <path
                                            d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                                            fill="#0C68F4" />
                                    </svg>
                                </span></a>

                        </div>

                    </div>
        </>
    )
}