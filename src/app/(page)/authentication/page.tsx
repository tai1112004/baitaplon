"use client"
import {SuccessPage} from '@/app/Components/notification/susscess';
import {WrongPage} from '@/app/Components/notification/wrong';
import {useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
export default function LoginSignupForm() {
  const [isActive, setIsActive] = useState(false);
  const [success,setsuccess] = useState(false);
  const [wrong,setwrong] = useState(false);
  const [success_regis,setsuccess_regis] = useState(false);
  const [wrong_regis,setwrong_regis] = useState(false);
  const router = useRouter() ; 
  const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [formregister, setRegister] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [user, setuser] = useState({
    username: '',
    password: '' 
  });
  const datasuccessLogin ={
    title: "Đăng nhập thành công"
  }
  const datawrongLogin ={
    title: "Đăng nhập thất bại"
  }
  const datasuccessRegister ={
    title: "Tạo tài khoản thành công"
  }
  const datawrongRegister ={
    title: "Đã có người sử dụng tài khoản của bạn  "
  }
  useEffect(()=>{
    if(user.username === ''|| user.password=== '' ) 
      {
        console.log("dang chay vao day")
        return ;
      } 
    const login = async () =>
    {

      const response = await fetch('https://ecommerce-django-production-6256.up.railway.app/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(user), 
      }) ; 
      
      if(response.status==200)
      {
        setsuccess(true) ; 
        setwrong(false) ; 
        const data = await response.json();
        if(!isClient) return ; 
        document.cookie = `token=${data.token}; path=/; max-age=86400`;
        setTimeout(() => {
          
          if(data.isAdmin)
        {
           window.location.href = "https://ecommerce-django-production-6256.up.railway.app/admin";
        }
        else 
        {
          
          router.push("/"); 
        }
        }, 1000);
      }
      else
      {
        
        setwrong(true) ; 
        setsuccess(false)
      }
      
      
    }
    login();
  },[user])
  useEffect(()=>{
    if(formregister.name === ''|| formregister.password=== ''||formregister.email==='' ) 
      {
        console.log("dang chay vao day")
        return ;
      } 
    const register = async () =>
    {
      const response = await fetch('https://ecommerce-django-production-6256.up.railway.app/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formregister), 
      }) ; 
      
      if(response.status==200)
      {
        setsuccess_regis(true) ; 
        setwrong_regis(false) ; 
        
      }
      else
      {
        
        setwrong_regis(true) ; 
        setsuccess_regis(false)
      }
      
      
    }
    register();
  },[formregister])
  useEffect(()=>{
    if(wrong)
    {
      const timer = setTimeout(() => {
        setwrong(false)
      }, 1800);
      return () =>clearTimeout(timer) ; 
    }
  },[wrong]) ; 
  useEffect(()=>{
    if(success)
    {
      const timer = setTimeout(() => {
        setsuccess(false)
      }, 2000);
      return () =>clearTimeout(timer) ; 
    }
  },[success]) ; 
  useEffect(()=>{
    if(wrong_regis)
    {
      const timer = setTimeout(() => {
        setwrong_regis(false)
      }, 1800);
      return () =>clearTimeout(timer) ; 
    }
  },[wrong_regis]) ; 
  useEffect(()=>{
    if(success_regis)
    {
      const timer = setTimeout(() => {
        setsuccess_regis(false)
      }, 2000);
      return () =>clearTimeout(timer) ; 
    }
  },[success_regis]) ;
  const handleRegisterClick = () => {

    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("da chay vao day")
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const data = {
      username: target.username.value, 
      password: target.password.value
    } ; 
    setuser(data); 
  };
const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    username: { value: string };
    email: { value: string };
    password: { value: string };
  };
  const data = {
    name: target.username.value,
    email: target.email.value,
    password: target.password.value 
  };
  setRegister(data); 
}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        @import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
          text-decoration: none;
          list-style: none;
        }

        body {
          background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
        }
      `}</style>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          position: relative;
          width: 1200px;
          height: 550px;
          background: #fff; 
          border-radius: 30px;
          box-shadow: 0 0 30px rgba(0, 0, 0, .2);
          overflow: hidden;
        }

        .container h1 {
          font-size: 36px;
          margin: -10px 0;
        }

        .container p {
          font-size: 14.5px;
          margin: 15px 0;
        }

        .form-container {
          width: 100%;
        }

        .form-box {
          position: absolute;
          right: 0;
          width: 50%;
          height: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          color: #333;
          text-align: center;
          padding: 40px;
          z-index: 1;
          transition: .6s ease-in-out 1.2s, visibility 0s 1s;
        }

        .container.active .form-box {
          right: 50%;
        }

        .form-box.register {
          visibility: hidden;
        }

        .container.active .form-box.register {
          visibility: visible;
        }

        .input-box {
          position: relative;
          margin: 30px 0;
        }

        .input-box input {
          width: 100%;
          padding: 13px 50px 13px 20px;
          background: #eee;
          border-radius: 8px;
          border: none;
          outline: none;
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }

        .input-box input::placeholder {
          color: #888;
          font-weight: 400;
        }

        .input-box i {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
        }

        .forgot-link {
          margin: -15px 0 15px;
        }

        .forgot-link a {
          font-size: 14.5px;
          color: #333;
          cursor: pointer;
        }

        .forgot-link a:hover {
          text-decoration: underline;
        }

        .btn {
          width: 100%;
          height: 48px;
          background: #7494ec;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, .1);
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #fff;
          font-weight: 600;
        }

        .btn:hover {
          background: #5a7bd8;
          transition: background 0.3s ease;
        }

        .social-icons {
          display: flex;
          justify-content: center;
        }

        .social-icons a {
          display: inline-flex;
          padding: 10px;
          border: 2px solid #ccc;
          border-radius: 8px;
          font-size: 24px;
          color: #333;
          margin: 0 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .social-icons a:hover {
          background: #f0f0f0;
          border-color: #7494ec;
        }

        .toggle-box {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .toggle-box::before {
          content: '';
          position: absolute;
          left: -250%;
          width: 300%;
          height: 100%;
          background: #7494ec;
          border-radius: 150px;
          z-index: 2;
          transition: 1.8s ease-in-out;
        }

        .container.active .toggle-box::before {
          left: 50%;
        }

        .toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 2;
          transition: .6s ease-in-out;
        }

        .toggle-panel.toggle-left {
          left: 0;
          transition-delay: 1.2s;
        }

        .container.active .toggle-panel.toggle-left {
          left: -50%;
          transition-delay: .6s;
        }

        .toggle-panel.toggle-right {
          right: -50%;
          transition-delay: .6s;
        }

        .container.active .toggle-panel.toggle-right {
          right: 0;
          transition-delay: 1.2s;
        }

        .toggle-panel p {
          margin-bottom: 20px;
        }

        .toggle-panel .btn {
          width: 160px;
          height: 46px;
          background: transparent;
          border: 2px solid #fff;
          box-shadow: none;
        }

        .toggle-panel .btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media screen and (max-width: 1250px) {
          .container {
            width: 95%;
            max-width: 1200px;
          }
        }

        @media screen and (max-width: 650px) {
          .container {
            height: calc(100vh - 40px);
            width: 95%;
          }

          .form-box {
            bottom: 0;
            width: 100%;
            height: 70%;
          }

          .container.active .form-box {
            right: 0;
            bottom: 30%;
          }

          .toggle-box::before {
            left: 0;
            top: -270%;
            width: 100%;
            height: 300%;
            border-radius: 20vw;
          }

          .container.active .toggle-box::before {
            left: 0;
            top: 70%;
          }

          .container.active .toggle-panel.toggle-left {
            left: 0;
            top: -30%;
          }

          .toggle-panel {
            width: 100%;
            height: 30%;
          }

          .toggle-panel.toggle-left {
            top: 0;
          }

          .toggle-panel.toggle-right {
            right: 0;
            bottom: -30%;
          }

          .container.active .toggle-panel.toggle-right {
            bottom: 0;
          }
        }

        @media screen and (max-width: 400px) {
          .form-box {
            padding: 20px;
          }

          .toggle-panel h1 {
            font-size: 30px;
          }
        }
      `}</style>
      {
        success && (
          <>
            <SuccessPage data={datasuccessLogin}/>
          </>
        )
      }
      {
        wrong && (
          <WrongPage data={datawrongLogin}/>
        )
      }
      {
        success_regis && (
          <>
            <SuccessPage data={datasuccessRegister}/>
          </>
        )
      }
      {
        wrong_regis && (
          <WrongPage data={datawrongRegister}/>
        )
      }
      <div className="wrapper">
        <div className={`container ${isActive ? 'active' : ''}`}>
          {/* Login Form */}
          <form className="form-box login" onSubmit={handleSubmitLogin}>
            <div className="form-container">
              <h1>Login</h1>
              <div className="input-box">
                <input 
                  type="text" 
                  placeholder="Username" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required 
                />
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <i className='bx bxs-lock-alt'></i>
              </div>
              <div className="forgot-link">
                <a onClick={() => console.log('Forgot password clicked')}>
                  Forgot Password?
                </a>
              </div>
              <button 
                type="submit" 
                className="btn"
                
              >
                Login
              </button>
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a onClick={() => console.log('Google login')}>
                  <i className='bx bxl-google'></i>
                </a>
                <a onClick={() => console.log('Facebook login')}>
                  <i className='bx bxl-facebook'></i>
                </a>
                <a onClick={() => console.log('GitHub login')}>
                  <i className='bx bxl-github'></i>
                </a>
                <a onClick={() => console.log('LinkedIn login')}>
                  <i className='bx bxl-linkedin'></i>
                </a>
              </div>
            </div>
          </form>

          {/* Register Form */}
          <form className="form-box register" onSubmit={handleSubmitRegister}>
            <div className="form-container">
              <h1>Register</h1>
              <div className="input-box">
                <input 
                  type="text" 
                  placeholder="Username" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required 
                />
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input 
                  type="email" 
                  placeholder="Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <i className='bx bxs-envelope'></i>
              </div>
              <div className="input-box">
                <input 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <i className='bx bxs-lock-alt'></i>
              </div>
              <button 
                type="submit" 
                className="btn"
                
              >
                Register
              </button>
              <p>or register with social platforms</p>
              <div className="social-icons">
                <a onClick={() => console.log('Google register')}>
                  <i className='bx bxl-google'></i>
                </a>
                <a onClick={() => console.log('Facebook register')}>
                  <i className='bx bxl-facebook'></i>
                </a>
                <a onClick={() => console.log('GitHub register')}>
                  <i className='bx bxl-github'></i>
                </a>
                <a onClick={() => console.log('LinkedIn register')}>
                  <i className='bx bxl-linkedin'></i>
                </a>
              </div>
            </div>
          </form>

          {/* Toggle Box */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don&apos;t have an account?</p>
              <button className="btn register-btn" onClick={handleRegisterClick}>
                Register
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className="btn login-btn" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}