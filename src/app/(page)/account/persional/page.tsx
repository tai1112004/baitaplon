"use client"

import { SuccessPage } from "@/app/Components/notification/susscess";
import {WrongPage} from "@/app/Components/notification/wrong";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useEffect } from "react";
import {useState} from "react";
export default function PersionalPage() {
    const [token , settoken ]= useState(getCookie("token"));
    const [user , setuser] = useState({});
    const datasuccess ={
        "title" :  "Đã thay đổi thành công"
    }
    const datawrong ={
        "title" :  "Tên tài khoản hoặc email của bạn đã có người khác đăng kí trước"
    }
    const [user_update,setUpdate] = useState({
        name: null,
        email: null,
        password: null,
    });
    const [success,setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    useEffect(()=>{
        if(success)
        {
            const timer = setTimeout(() =>{
                setsuccess(false) ;
            },1550)
            return() => clearTimeout(timer) ; 
        }
    },[success])
    useEffect(()=>{
        if(error)
        {
            const timer = setTimeout(() =>{
                seterror(false) ;
            },1800)
            return() => clearTimeout(timer) ; 
        }
    },[error])
useEffect(()=>{
    if(!user_update.email || !user_update.name  )
    {
        console.log(user_update); 
        return ; 
    }

    const update = async() =>{
        const res = await fetch('https://ecommerce-django-production-7581.up.railway.app/api/users/profile/update/', {
            method: 'PUT' , 
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`    ,     
            } , 
            body: JSON.stringify(user_update) ,

        })
        if(res.status==200)
        {
            
            setsuccess(true) ; 
            
        }
        else 
        {
            seterror(true) ;
        }
    }
    update();
},[user_update])
    const handleSubmit = (e:any) =>{
        e.preventDefault(); 
        const username = user.name ;
        const email = user.email ;
        setUpdate(
            { 
                ... user_update ,
                name : username , 
                email: email 
               

            }
        
        )
     const xacnhan = document.getElementById("popupXacnhan") ; 
     if(xacnhan)
     {
        xacnhan.classList.add("hidden")  ; 
     }
          

    } 
    useEffect(()=>{
        const data_user = async ()=>{
            const respose = await fetch("https://ecommerce-django-production-7581.up.railway.app/api/users/profile",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`    , 
                },

            })
            setuser(await respose.json() )  ; 
             
        }
        data_user() ; 
    },[token])



    return (
        <>
        {
                success && (
                  <>
                    <SuccessPage data={datasuccess}/>
                  </>
                )
              }
              {
                error && (
                  <WrongPage data={datawrong}/>
                )
              }
            <div className="">
                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Identification</span>

                            <span className="p-2 text-[16px] font-light">Verify your identity</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-6 ">
                            <div>
                                <label className="text-[14px] font-light">Full name</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <p id="NameText" className="flex gap-2 text-[16px] font-light">


                                            <span id="NameText">{user.name}</span>
                                        </p>

                                    </div>



                                    <button id="editNameBtn" className="cursor-pointer" onClick={()=>{
                                        const editname = document.getElementById("popupName")
                                        if(editname)
                                        {
                                            editname.classList.remove("hidden") ; 
                                        }
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                                                fill="#0C68F4" />
                                            <path
                                                d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z"
                                                fill="#0C68F4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            
                            <div id="popupName"className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden">
                                <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={(e:any)=>{
                                        e.preventDefault() ; 
                                        const name = e.target.name.value ;
                                        if(name)
                                        {
                                            setuser(
                                            {
                                                ...user ,
                                                name : name  
                                            }
                                        )
                                        }
                                        const editname = document.getElementById("popupName") ; 
                                        if(editname)
                                        {
                                            editname.classList.add("hidden") ;
                                        }
                                        
                                }} >
                                    <h2 className="text-lg font-semibold">Edit Full Name</h2>
                                    <input id="NameInput" type="text" className="border p-2 w-full mt-2 rounded-md" placeholder="Nhập tên mới..." name = "name" 
                                    defaultValue={user.username} />
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button id="cancelNameBtn" className="bg-gray-500 text-white px-4 py-2 rounded-md" type="button" onClick={()=>{
                                            const editname = document.getElementById("popupName") ;
                                            if(editname)
                                            {
                                                editname.classList.add("hidden") ;
                                            }

                                        }}
                                        >Huỷ</button>
                                        <button id="saveNameBtn" className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Lưu</button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <label className="text-[14px] font-light">E-mail</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">
                                    <div className="flex gap-2">
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
                                        <p id="EmailText" className="flex gap-2 text-[16px] font-light">

                                            <span id="EmailText"> {user.email}</span>

                                        </p>
                                    </div>

                                    <button id="editEmailBtn" className="cursor-pointer"><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{
                                        const editemail = document.getElementById("popupEmail")
                                        if(editemail)
                                        {
                                            editemail.classList.remove("hidden") ; 
                                        }
                                    }}>
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
                            </div>
                           
                            <div id="popupEmail"
                                className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden">
                                <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={(e:any)=>{
                                        e.preventDefault() ; 
                                        const email = e.target.email.value ;
                                        if(email)
                                        {
                                            setuser(
                                            {
                                                ...user ,
                                                email : email   
                                            }
                                        )
                                        }
                                        const editemail = document.getElementById("popupEmail") ; 
                                        if(editemail)
                                        {
                                            editemail.classList.add("hidden") ;
                                        }
                                        
                                }}>
                                    <h2 className="text-lg font-semibold">Edit Email</h2>
                                    <input id="EmailInput" type="text" className="border p-2 w-full mt-2 rounded-md"
                                        placeholder="Nhập Email mới..." name ="email" defaultValue={user.email}/>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button id="cancelEmailBtn"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"onClick={()=>{
                                        const editemail = document.getElementById("popupEmail")
                                        if(editemail)
                                        {
                                            editemail.classList.add("hidden") ; 
                                        }
                                    }}>Huỷ</button>
                                        <button id="saveEmailBtn"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Lưu</button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <label className="text-[14px] font-light">Phone number</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">
                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                                                fill="#444444" />
                                        </svg>
                                        <p id="fullPhone" className="flex gap-2 text-[16px] font-light">

                                            <span id="PhoneText">+1234567890</span>

                                        </p>
                                    </div>

                                    <button id="editPhoneBtn" className="cursor-pointer"><svg width="24" height="24"
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
                            </div>
                            <div>
                                <label className="text-[14px] font-light">Password</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">

                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.18014 22.7499C6.08014 22.7499 5.97014 22.7399 5.88014 22.7299L3.71014 22.4299C2.67014 22.2899 1.73014 21.3599 1.57014 20.2999L1.27014 18.1099C1.17014 17.4099 1.47014 16.4999 1.97014 15.9899L6.36014 11.5999C5.65014 8.75992 6.47014 5.75992 8.56014 3.68992C11.8001 0.459923 17.0701 0.449923 20.3201 3.68992C21.8901 5.25992 22.7501 7.34992 22.7501 9.56992C22.7501 11.7899 21.8901 13.8799 20.3201 15.4499C18.2201 17.5299 15.2301 18.3499 12.4101 17.6299L8.01014 22.0199C7.59014 22.4599 6.84014 22.7499 6.18014 22.7499ZM14.4301 2.75992C12.6801 2.75992 10.9401 3.41992 9.61014 4.74992C7.81014 6.53992 7.16014 9.15992 7.91014 11.5999C7.99014 11.8699 7.92014 12.1499 7.72014 12.3499L3.02014 17.0499C2.85014 17.2199 2.71014 17.6599 2.74014 17.8899L3.04014 20.0799C3.10014 20.4599 3.51014 20.8899 3.89014 20.9399L6.07014 21.2399C6.31014 21.2799 6.75014 21.1399 6.92014 20.9699L11.6401 16.2599C11.8401 16.0599 12.1301 15.9999 12.3901 16.0799C14.8001 16.8399 17.4301 16.1899 19.2301 14.3899C20.5101 13.1099 21.2201 11.3899 21.2201 9.56992C21.2201 7.73992 20.5101 6.02992 19.2301 4.74992C17.9301 3.42992 16.1801 2.75992 14.4301 2.75992Z"
                                                fill="#444444" />
                                            <path
                                                d="M9.19008 20.5399C9.00008 20.5399 8.81008 20.4699 8.66008 20.3199L6.36008 18.0199C6.07008 17.7299 6.07008 17.2499 6.36008 16.9599C6.65008 16.6699 7.13008 16.6699 7.42008 16.9599L9.72008 19.2599C10.0101 19.5499 10.0101 20.0299 9.72008 20.3199C9.57008 20.4699 9.38008 20.5399 9.19008 20.5399Z"
                                                fill="#444444" />
                                            <path
                                                d="M14.5 11.75C13.26 11.75 12.25 10.74 12.25 9.5C12.25 8.26 13.26 7.25 14.5 7.25C15.74 7.25 16.75 8.26 16.75 9.5C16.75 10.74 15.74 11.75 14.5 11.75ZM14.5 8.75C14.09 8.75 13.75 9.09 13.75 9.5C13.75 9.91 14.09 10.25 14.5 10.25C14.91 10.25 15.25 9.91 15.25 9.5C15.25 9.09 14.91 8.75 14.5 8.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <p id="PasswordText" className="flex gap-2 text-[16px] font-light">
                                            <span id="PasswordText">******************</span>
                                        </p>
                                    </div>

                                    <button id="editPasswordBtn" className="cursor-pointer"><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{
                                        const editPassword = document.getElementById("popupPassword")
                                        if(editPassword)
                                        {
                                            editPassword.classList.remove("hidden") ; 
                                        }
                                    }}>

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
                            </div>
                            <div id="popupPassword"
                                className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden">
                                <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={(e:any)=>{
                                        e.preventDefault() ; 
                                        const password = e.target.password.value ;
                                        if(password)
                                        {
                                            setUpdate(
                                            {
                                                ...user_update ,
                                                password: password
                                            }
                                        )
                                        }
                                        const editPassword = document.getElementById("popupPassword") ; 
                                        if(editPassword)
                                        {
                                            editPassword.classList.add("hidden") ;
                                        }
                                        
                                }}
>
                                    <h2 className="text-lg font-semibold">Edit username</h2>
                                    <input id="PasswordInput" type="text" className="border p-2 w-full mt-2 rounded-md"
                                        placeholder="nhập mật khẩu mới......" name ="password" defaultValue="************" />
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button id="cancelPasswordBtn"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={()=>{
                                            const editPassword = document.getElementById("popupPassword") ;
                                            if(editPassword)
                                            {
                                                editPassword.classList.add("hidden") ;
                                            }

                                        }}>Huỷ</button>
                                        <button id="saveUsernameBtn"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Lưu</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <label className="text-[14px] font-light">Address</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">
                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.00997 2.09 7.29997 3.17 6.45997L8.56 2.25997C10.18 0.999974 12.77 0.939974 14.45 2.11997L20.63 6.44997C21.82 7.27997 22.75 9.05997 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.43997L4.09 7.63997C3.38 8.19997 2.75 9.46997 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.54997 20.56 8.21997 19.77 7.67997L13.59 3.34997C12.45 2.54997 10.57 2.58997 9.48 3.43997Z"
                                                fill="#444444" />
                                            <path
                                                d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <p id="AddressText" className="flex gap-2 text-[16px] font-light">
                                            <span id="AddressText">HubSpot, 25 First Street, Cambridge</span>
                                        </p>
                                    </div>

                                    <button id="editAddressBtn" className="cursor-pointer"><svg width="24" height="24"
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
                            </div>
                            <div id="popupXacnhan"
                                className="fixed inset-0 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs hidden">
                                <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={handleSubmit}>
                                    <h2 className="text-lg font-semibold text-center"> Bạn chắc chắn thay đổi chứ ?? 
                                    </h2>
                                    <div className="flex justify-between gap-2  p-[5px] mt-[50px]">
                                        <button id="cancelPasswordBtn"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md" type="button" onClick={()=>{
                                                const Password = document.getElementById('popupXacnhan');
                                                if(Password)
                                                {
                                                    Password.classList.add('hidden');
                                                }
                                            }}>Huỷ</button>
                                        <button id="saveAddressBtn"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Cập nhật</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <label className="text-[14px] font-light">Postal code</label>
                                <div
                                    className=" rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100 ">
                                    <div className="flex gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.22 9.75H8.96002C8.40002 9.75 7.84002 9.56001 7.40002 9.20001L5.21002 7.45001C4.61002 6.97001 4.27002 6.26 4.27002 5.5C4.27002 4.74 4.61002 4.01999 5.21002 3.54999L7.40002 1.79999C7.84002 1.44999 8.40002 1.25 8.96002 1.25H17.22C18.6 1.25 19.72 2.37 19.72 3.75V7.25C19.72 8.63 18.6 9.75 17.22 9.75ZM8.96002 2.75C8.73002 2.75 8.51003 2.83 8.34003 2.97L6.15002 4.72C5.91002 4.91 5.77002 5.2 5.77002 5.5C5.77002 5.8 5.91002 6.09 6.15002 6.28L8.34003 8.03C8.52003 8.17 8.74002 8.25 8.96002 8.25H17.22C17.77 8.25 18.22 7.8 18.22 7.25V3.75C18.22 3.2 17.77 2.75 17.22 2.75H8.96002Z"
                                                fill="#444444" />
                                            <path
                                                d="M15.0598 19.75H6.7998C5.4198 19.75 4.2998 18.63 4.2998 17.25V13.75C4.2998 12.37 5.4198 11.25 6.7998 11.25H15.0598C15.6298 11.25 16.1798 11.44 16.6198 11.8L18.8098 13.55C19.4098 14.03 19.7498 14.74 19.7498 15.5C19.7498 16.26 19.4098 16.98 18.8098 17.45L16.6198 19.2C16.1798 19.56 15.6298 19.75 15.0598 19.75ZM6.7998 12.75C6.2498 12.75 5.7998 13.2 5.7998 13.75V17.25C5.7998 17.8 6.2498 18.25 6.7998 18.25H15.0598C15.2898 18.25 15.5098 18.17 15.6798 18.03L17.8698 16.28C18.1098 16.09 18.2498 15.8 18.2498 15.5C18.2498 15.2 18.1098 14.91 17.8698 14.72L15.6798 12.97C15.4998 12.83 15.2798 12.75 15.0598 12.75H6.7998Z"
                                                fill="#444444" />
                                            <path
                                                d="M12 12.75C11.59 12.75 11.25 12.41 11.25 12V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V12C12.75 12.41 12.41 12.75 12 12.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V19C11.25 18.59 11.59 18.25 12 18.25C12.41 18.25 12.75 18.59 12.75 19V22C12.75 22.41 12.41 22.75 12 22.75Z"
                                                fill="#444444" />
                                            <path
                                                d="M15 22.75H9C8.59 22.75 8.25 22.41 8.25 22C8.25 21.59 8.59 21.25 9 21.25H15C15.41 21.25 15.75 21.59 15.75 22C15.75 22.41 15.41 22.75 15 22.75Z"
                                                fill="#444444" />
                                        </svg>
                                        <p id="PostalcodeText" className="flex gap-2 text-[16px] font-light">
                                            <span id="PostalcodeText">HubSpot, 25 First Street, Cambridge</span>
                                        </p>
                                    </div>

                                    <button id="editPostalcodeBtn" className="cursor-pointer"><svg width="24" height="24"
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
                            </div>
                        </div>
                                        <button type="button" className="mt-[50px] w-[200px] h-[50px] bg-[blue] text-[white] text-center rounded-[8px]" onClick={()=>{
                                            const password = document.getElementById("popupXacnhan") ; 
                                            if(password)
                                            {
                                                password.classList.remove("hidden") ; 
                                            }
                                        }}>Lưu Thay Đổi 

                                        </button>
                    </div>
        </>
    )
}