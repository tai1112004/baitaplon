export default function NotificationPage() {
    return (
        <>
            <div className="">
                        <div className="flex flex-col gap-1">
                            <span className="p-2 text-[20px] font-medium ">Notification </span>

                            <span className="p-2 text-[16px] font-light">Manage your notification settings</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-6 ">
                            <div className="w-[392px] h-[104px]">
                                <div className=" flex w-[384px] h-[32px] justify-between">
                                    <div className="flex gap-2  ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                                fill="#0C0C0C" />
                                            <path
                                                d="M13.7602 17.75H10.2302C9.13023 17.75 8.26023 17.21 7.77023 16.23L6.88023 14.44C6.67023 14.01 6.24023 13.75 5.76023 13.75H1.99023C1.58023 13.75 1.24023 13.41 1.24023 13C1.24023 12.59 1.59023 12.25 2.00023 12.25H5.76023C6.81024 12.25 7.75024 12.83 8.22023 13.77L9.11023 15.56C9.34023 16.02 9.71023 16.25 10.2302 16.25H13.7602C14.2402 16.25 14.6702 15.99 14.8802 15.56L15.7702 13.77C16.2402 12.83 17.1802 12.25 18.2302 12.25H21.9702C22.3802 12.25 22.7202 12.59 22.7202 13C22.7202 13.41 22.3802 13.75 21.9702 13.75H18.2302C17.7502 13.75 17.3202 14.01 17.1102 14.44L16.2202 16.23C15.7502 17.17 14.8102 17.75 13.7602 17.75Z"
                                                fill="#0C0C0C" />
                                            <path
                                                d="M13.6701 7.75H10.3401C9.92008 7.75 9.58008 7.41 9.58008 7C9.58008 6.59 9.92008 6.25 10.3301 6.25H13.6601C14.0701 6.25 14.4101 6.59 14.4101 7C14.4101 7.41 14.0801 7.75 13.6701 7.75Z"
                                                fill="#0C0C0C" />
                                            <path
                                                d="M14.5 10.75H9.5C9.09 10.75 8.75 10.41 8.75 10C8.75 9.59 9.09 9.25 9.5 9.25H14.5C14.91 9.25 15.25 9.59 15.25 10C15.25 10.41 14.91 10.75 14.5 10.75Z"
                                                fill="#0C0C0C" />
                                        </svg>
                                        <span className="text-[16px] font-medium">Emails</span>

                                    </div>
                                    <label className="fui-checkbox-toggle">
                                        <input type="checkbox" className="toggle-input" aria-label="Toggle email notifications" />
                                        <div className="toggle-bar">
                                            <div className="toggle-spin"></div>
                                        </div>
                                    </label>
                                </div>


                                <span className="text-[16px] font-light ">We write emails to let you know what&apos;s
                                    important,
                                    like: new order, confirmations
                                </span>
                            </div>
                            <div className="">
                                <div className=" flex w-[384px] h-[32px] justify-between">
                                    <div className="flex gap-2  ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H17C20.65 2.75 22.75 4.85 22.75 8.5V15.5C22.75 19.15 20.65 21.25 17 21.25ZM7 4.25C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V8.5C21.25 5.64 19.86 4.25 17 4.25H7Z"
                                                fill="#292D32" />
                                            <path
                                                d="M11.9998 12.87C11.1598 12.87 10.3098 12.61 9.65978 12.08L6.52978 9.57997C6.20978 9.31997 6.14978 8.84997 6.40978 8.52997C6.66978 8.20997 7.13978 8.14997 7.45978 8.40997L10.5898 10.91C11.3498 11.52 12.6398 11.52 13.3998 10.91L16.5298 8.40997C16.8498 8.14997 17.3298 8.19997 17.5798 8.52997C17.8398 8.84997 17.7898 9.32997 17.4598 9.57997L14.3298 12.08C13.6898 12.61 12.8398 12.87 11.9998 12.87Z"
                                                fill="#292D32" />
                                        </svg>

                                        <span className="text-[16px] font-medium">Push to your Device</span>

                                    </div>
                                    <label className="fui-checkbox-toggle" htmlFor="push-device-toggle">
                                        <input
                                            type="checkbox"
                                            id="push-device-toggle"
                                            className="toggle-input"
                                            aria-label="Toggle push notifications to your device"
                                        />
                                        <div className="toggle-bar">
                                            <div className="toggle-spin"></div>
                                        </div>
                                    </label>
                                </div>


                                <span className="text-[16px] font-light  w-[286px]">Receive notifications about your order
                                    status,
                                    promotions and other updates
                                </span>
                            </div>
                            <div className="">
                                <div className=" flex w-[384px] h-[32px] justify-between">
                                    <div className="flex gap-2  ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13 14.75H2C1.59 14.75 1.25 14.41 1.25 14V6C1.25 3.38 3.38 1.25 6 1.25H15C15.41 1.25 15.75 1.59 15.75 2V12C15.75 13.52 14.52 14.75 13 14.75ZM2.75 13.25H13C13.69 13.25 14.25 12.69 14.25 12V2.75H6C4.21 2.75 2.75 4.21 2.75 6V13.25Z"
                                                fill="#292D32" />
                                            <path
                                                d="M19 20.75H18C17.59 20.75 17.25 20.41 17.25 20C17.25 19.31 16.69 18.75 16 18.75C15.31 18.75 14.75 19.31 14.75 20C14.75 20.41 14.41 20.75 14 20.75H10C9.59 20.75 9.25 20.41 9.25 20C9.25 19.31 8.69 18.75 8 18.75C7.31 18.75 6.75 19.31 6.75 20C6.75 20.41 6.41 20.75 6 20.75H5C2.93 20.75 1.25 19.07 1.25 17V14C1.25 13.59 1.59 13.25 2 13.25H13C13.69 13.25 14.25 12.69 14.25 12V5C14.25 4.59 14.59 4.25 15 4.25H16.84C17.83 4.25 18.74 4.78001 19.23 5.64001L20.94 8.63C21.07 8.86 21.07 9.15 20.94 9.38C20.81 9.61 20.56 9.75 20.29 9.75H19C18.86 9.75 18.75 9.86 18.75 10V13C18.75 13.14 18.86 13.25 19 13.25H22C22.41 13.25 22.75 13.59 22.75 14V17C22.75 19.07 21.07 20.75 19 20.75ZM18.65 19.25H19C20.24 19.25 21.25 18.24 21.25 17V14.75H19C18.04 14.75 17.25 13.96 17.25 13V10C17.25 9.04 18.03 8.25 19 8.25L17.93 6.38C17.71 5.99 17.29 5.75 16.84 5.75H15.75V12C15.75 13.52 14.52 14.75 13 14.75H2.75V17C2.75 18.24 3.76 19.25 5 19.25H5.35001C5.68001 18.1 6.74 17.25 8 17.25C9.26 17.25 10.32 18.1 10.65 19.25H13.36C13.69 18.1 14.75 17.25 16.01 17.25C17.27 17.25 18.32 18.1 18.65 19.25Z"
                                                fill="#292D32" />
                                            <path
                                                d="M8 22.75C6.48 22.75 5.25 21.52 5.25 20C5.25 18.48 6.48 17.25 8 17.25C9.52 17.25 10.75 18.48 10.75 20C10.75 21.52 9.52 22.75 8 22.75ZM8 18.75C7.31 18.75 6.75 19.31 6.75 20C6.75 20.69 7.31 21.25 8 21.25C8.69 21.25 9.25 20.69 9.25 20C9.25 19.31 8.69 18.75 8 18.75Z"
                                                fill="#292D32" />
                                            <path
                                                d="M16 22.75C14.48 22.75 13.25 21.52 13.25 20C13.25 18.48 14.48 17.25 16 17.25C17.52 17.25 18.75 18.48 18.75 20C18.75 21.52 17.52 22.75 16 22.75ZM16 18.75C15.31 18.75 14.75 19.31 14.75 20C14.75 20.69 15.31 21.25 16 21.25C16.69 21.25 17.25 20.69 17.25 20C17.25 19.31 16.69 18.75 16 18.75Z"
                                                fill="#292D32" />
                                            <path
                                                d="M22 14.75H19C18.04 14.75 17.25 13.96 17.25 13V10C17.25 9.04 18.04 8.25 19 8.25H20.29C20.56 8.25 20.81 8.39 20.94 8.63L22.65 11.63C22.71 11.74 22.75 11.87 22.75 12V14C22.75 14.41 22.41 14.75 22 14.75ZM19 9.75C18.86 9.75 18.75 9.86 18.75 10V13C18.75 13.14 18.86 13.25 19 13.25H21.25V12.2L19.85 9.75H19Z"
                                                fill="#292D32" />
                                        </svg>

                                        <span className="text-[16px] font-medium">Oder Delivered</span>

                                    </div>
                                    <label className="fui-checkbox-toggle" htmlFor="order-delivered-toggle">
                                        <input
                                            type="checkbox"
                                            id="order-delivered-toggle"
                                            className="toggle-input"
                                            aria-label="Toggle order delivered notifications"
                                            title="Toggle order delivered notifications"
                                        />
                                        <div className="toggle-bar">
                                            <div className="toggle-spin"></div>
                                        </div>
                                    </label>
                                </div>


                                <span className="text-[16px] font-light  w-[286px]">You will be noticed once the order is
                                    delivered
                                </span>
                            </div>
                            <div className="">
                                <div className=" flex w-[384px] h-[32px] justify-between">
                                    <div className="flex gap-2  ">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 19.3701C10.21 19.3701 8.41994 18.6901 7.04994 17.3201C4.31994 14.5901 4.31994 10.1501 7.04994 7.42006C9.77994 4.69006 14.22 4.69006 16.95 7.42006C19.68 10.1501 19.68 14.5901 16.95 17.3201C15.58 18.6901 13.79 19.3701 12 19.3701ZM12 6.87007C10.59 6.87007 9.17994 7.41006 8.10994 8.48006C5.96994 10.6301 5.96994 14.1101 8.10994 16.2601C10.2599 18.4101 13.75 18.4001 15.89 16.2601C18.03 14.1101 18.03 10.6301 15.89 8.48006C14.82 7.41006 13.41 6.87007 12 6.87007Z"
                                                fill="#292D32" />
                                            <path
                                                d="M8.25003 22.3899C8.16003 22.3899 8.06004 22.3699 7.97004 22.3399C5.72004 21.4399 3.90003 19.8499 2.68003 17.7499C1.50003 15.6999 1.03003 13.3799 1.34003 11.0199C1.39003 10.6099 1.77003 10.3199 2.18003 10.3699C2.59003 10.4199 2.88002 10.7999 2.83002 11.2099C2.57002 13.2299 2.97005 15.2299 3.98005 16.9899C5.02005 18.7899 6.59002 20.1599 8.52002 20.9299C8.90002 21.0899 9.09004 21.5198 8.94004 21.9098C8.83004 22.2098 8.54003 22.3899 8.25003 22.3899Z"
                                                fill="#292D32" />
                                            <path
                                                d="M5.8501 5.22986C5.6301 5.22986 5.4101 5.12988 5.2601 4.93988C5.0001 4.60988 5.06011 4.13989 5.39011 3.88989C7.30011 2.39989 9.58009 1.60986 12.0001 1.60986C14.3601 1.60986 16.6101 2.36988 18.5001 3.80988C18.8301 4.05988 18.8901 4.52986 18.6401 4.85986C18.3901 5.18986 17.9201 5.24988 17.5901 4.99988C15.9701 3.75988 14.0401 3.10986 12.0001 3.10986C9.92009 3.10986 7.95009 3.78989 6.31009 5.06989C6.17009 5.17989 6.0101 5.22986 5.8501 5.22986Z"
                                                fill="#292D32" />
                                            <path
                                                d="M15.7502 22.3901C15.4502 22.3901 15.1702 22.2101 15.0502 21.9201C14.9002 21.5401 15.0802 21.1001 15.4702 20.9401C17.4002 20.1601 18.9702 18.8001 20.0102 17.0001C21.0302 15.2401 21.4302 13.2401 21.1602 11.2201C21.1102 10.8101 21.4002 10.4301 21.8102 10.3801C22.2102 10.3301 22.6002 10.6201 22.6502 11.0301C22.9502 13.3801 22.4902 15.7101 21.3102 17.7601C20.1002 19.8601 18.2702 21.4401 16.0202 22.3501C15.9402 22.3701 15.8502 22.3901 15.7502 22.3901Z"
                                                fill="#292D32" />
                                        </svg>

                                        <span className="text-[16px] font-medium">Product&apos;s availibilty</span>

                                    </div>
                                    <label className="fui-checkbox-toggle">
                                        <input
                                            type="checkbox"
                                            id="toggle-input"
                                            className="toggle-input"
                                            aria-label="Toggle product availability notifications"
                                            title="Toggle product availability notifications"
                                        />
                                        <div className="toggle-bar">
                                            <div className="toggle-spin"></div>
                                        </div>
                                    </label>
                                </div>


                                <span className="text-[16px] font-light w-[286px]">You will be noticed when product gets
                                    available
                                </span>
                            </div>

                        </div>

                    </div>
        </>
    )
}