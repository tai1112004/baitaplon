"use client"

import { SuccessPage } from "@/app/Components/notification/susscess";
import { WrongPage } from "@/app/Components/notification/wrong";
import { getCookie } from "@/app/function/GetCookie/GetCookie";
import { useEffect, useState } from "react";
import { userApi } from "../../../../../lib/api";

type User = {
    name: string;
    email: string;
    password: string;
}

export default function PersonalPage() {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
    });
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    // Modal states
    const [showNameModal, setShowNameModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const token = getCookie("token");

    const datasuccess = {
        "title": "Đã thay đổi thành công"
    };

    const datawrong = {
        "title": "Tên tài khoản hoặc email của bạn đã có người khác đăng kí trước"
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Auto hide notifications
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 1550);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(false), 1800);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${userApi}getProfile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    // Update user profile
    const updateProfile = async () => {
        try {
            const response = await fetch(`${userApi}updateInfor`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(true);
        }
        console.log(user)
        setShowConfirmModal(false);
    };

    // Handle form submissions
    const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
        if (name) {
            setUser(prev => ({ ...prev, name }));
        }
        setShowNameModal(false);
    };

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        if (email) {
            setUser(prev => ({ ...prev, email }));
        }
        setShowEmailModal(false);
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
        if (password) {
            setUser(prev => ({ ...prev, password }));
        }
        setShowPasswordModal(false);
    };

    if (!isClient) return null;

    return (
        <>
            {success && <SuccessPage data={datasuccess} />}
            {error && <WrongPage data={datawrong} />}

            <div className="">
                <div className="flex flex-col gap-1">
                    <span className="p-2 text-[20px] font-medium">Identification</span>
                    <span className="p-2 text-[16px] font-light">Verify your identity</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="text-[14px] font-light">Full name</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z" fill="#444444" />
                                    <path d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>{user.name}</span>
                                </p>
                            </div>
                            <button 
                                className="cursor-pointer"
                                onClick={() => setShowNameModal(true)}
                                title="Chỉnh sửa tên"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[14px] font-light">E-mail</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>{user.email}</span>
                                </p>
                            </div>
                            <button 
                                className="cursor-pointer"
                                onClick={() => setShowEmailModal(true)}
                                title="Chỉnh sửa email"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="text-[14px] font-light">Phone number</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>+1234567890</span>
                                </p>
                            </div>
                            <button className="cursor-pointer" title="Chỉnh sửa số điện thoại">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-[14px] font-light">Password</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.18014 22.7499C6.08014 22.7499 5.97014 22.7399 5.88014 22.7299L3.71014 22.4299C2.67014 22.2899 1.73014 21.3599 1.57014 20.2999L1.27014 18.1099C1.17014 17.4099 1.47014 16.4999 1.97014 15.9899L6.36014 11.5999C5.65014 8.75992 6.47014 5.75992 8.56014 3.68992C11.8001 0.459923 17.0701 0.449923 20.3201 3.68992C21.8901 5.25992 22.7501 7.34992 22.7501 9.56992C22.7501 11.7899 21.8901 13.8799 20.3201 15.4499C18.2201 17.5299 15.2301 18.3499 12.4101 17.6299L8.01014 22.0199C7.59014 22.4599 6.84014 22.7499 6.18014 22.7499Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>******************</span>
                                </p>
                            </div>
                            <button 
                                className="cursor-pointer"
                                onClick={() => setShowPasswordModal(true)}
                                title="Chỉnh sửa mật khẩu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-[14px] font-light">Address</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.00997 2.09 7.29997 3.17 6.45997L8.56 2.25997C10.18 0.999974 12.77 0.939974 14.45 2.11997L20.63 6.44997C21.82 7.27997 22.75 9.05997 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>149 Chiến Thắng - Tân Triều - Thanh Trì - Thành Phố Hà Nội</span>
                                </p>
                            </div>
                            <button className="cursor-pointer" title="Chỉnh sửa địa chỉ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label className="text-[14px] font-light">Postal code</label>
                        <div className="rounded-lg px-4 py-6 flex w-[392px] h-[72px] items-center justify-between bg-neutral-100">
                            <div className="flex gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.22 9.75H8.96002C8.40002 9.75 7.84002 9.56001 7.40002 9.20001L5.21002 7.45001C4.61002 6.97001 4.27002 6.26 4.27002 5.5C4.27002 4.74 4.61002 4.01999 5.21002 3.54999L7.40002 1.79999C7.84002 1.44999 8.40002 1.25 8.96002 1.25H17.22C18.6 1.25 19.72 2.37 19.72 3.75V7.25C19.72 8.63 18.6 9.75 17.22 9.75Z" fill="#444444" />
                                </svg>
                                <p className="flex gap-2 text-[16px] font-light">
                                    <span>Học Viện Kĩ Thuật Mật Mã (KMA)</span>
                                </p>
                            </div>
                            <button className="cursor-pointer" title="Chỉnh sửa mã bưu điện">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4" />
                                    <path d="M8.49984 17.6901C7.88984 17.6901 7.32984 17.4701 6.91984 17.0701C6.42984 16.5801 6.21984 15.8701 6.32984 15.1201L6.75984 12.1101C6.83984 11.5301 7.21984 10.7801 7.62984 10.3701L15.5098 2.49006C17.4998 0.500059 19.5198 0.500059 21.5098 2.49006C22.5998 3.58006 23.0898 4.69006 22.9898 5.80006C22.8998 6.70006 22.4198 7.58006 21.5098 8.48006L13.6298 16.3601C13.2198 16.7701 12.4698 17.1501 11.8898 17.2301L8.87984 17.6601C8.74984 17.6901 8.61984 17.6901 8.49984 17.6901Z" fill="#0C68F4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Changes Button */}
                <button 
                    type="button" 
                    className="mt-[50px] w-[200px] h-[50px] bg-blue-500 text-white text-center rounded-[8px] hover:bg-blue-600 transition-colors"
                    onClick={() => setShowConfirmModal(true)}
                >
                    Lưu Thay Đổi
                </button>
            </div>

            {/* Name Edit Modal */}
            {showNameModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 backdrop-blur-xs">
                    <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={handleNameSubmit}>
                        <h2 className="text-lg font-semibold">Edit Full Name</h2>
                        <input 
                            type="text" 
                            className="border p-2 w-full mt-2 rounded-md" 
                            placeholder="Nhập tên mới..." 
                            name="name" 
                            defaultValue={user.name} 
                            required
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowNameModal(false)}
                            >
                                Huỷ
                            </button>
                            <button 
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Email Edit Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 backdrop-blur-xs">
                    <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={handleEmailSubmit}>
                        <h2 className="text-lg font-semibold">Edit Email</h2>
                        <input 
                            type="email" 
                            className="border p-2 w-full mt-2 rounded-md" 
                            placeholder="Nhập Email mới..." 
                            name="email" 
                            defaultValue={user.email}
                            required
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowEmailModal(false)}
                            >
                                Huỷ
                            </button>
                            <button 
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Password Edit Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 backdrop-blur-xs">
                    <form className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]" onSubmit={handlePasswordSubmit}>
                        <h2 className="text-lg font-semibold">Edit Password</h2>
                        <input 
                            type="password" 
                            className="border p-2 w-full mt-2 rounded-md" 
                            placeholder="Nhập mật khẩu mới..." 
                            name="password" 
                            defaultValue=""
                            required
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowPasswordModal(false)}
                            >
                                Huỷ
                            </button>
                            <button 
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 backdrop-blur-xs">
                    <div className="bg-white p-6 rounded-md shadow-md w-[392px] h-[210px]">
                        <h2 className="text-lg font-semibold text-center">Bạn chắc chắn thay đổi chứ ??</h2>
                        <div className="flex justify-between gap-2 p-[5px] mt-[50px]">
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Huỷ
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={updateProfile}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}