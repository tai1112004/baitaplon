"use client"
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { usePathname } from "next/navigation";
import { ConversionProcess } from "./ConversionProcess/ConversionProcess";
import { AccountBar } from "./AccountBar/AccountBar";

export function LayoutWrapper({children}: Readonly<{children: React.ReactNode;}>) {
    const Pathname= usePathname();
    const noLayoutPage = ["/authentication"] ; 
    const layoutPageAdd =["/cart","/PurchaseOrder"] ;
    
    if(noLayoutPage.includes(Pathname)){
        return (
                    
                    <div className="container mx-auto my-0 w-[1440px]" >
                    
                    {children}
                    
                    </div>
                    
               
        );
    }
    if(layoutPageAdd.includes(Pathname))
    {
      return (
        <>
          <Header/>
          <div className="container mx-auto my-0 w-[1440px]" >
            <ConversionProcess/>
            {children}
            
          </div>
          <Footer/>
        </>
      )
    }
    if(Pathname.startsWith("/account"))
    {
      return (
        <>
          <Header/>
          <div className="container mx-auto my-0 w-[1440px]" >
            <div className="inner_wrap flex gap-[50px]">
              <AccountBar/>
              {children}
            </div>
            
            
          </div>
          <Footer/>
        </>
      )
    }
  else {
    return (
    <><Header/>
        <div className="container mx-auto my-0 w-[1440px]" >
          
          {children}
          
        </div>
        <Footer/>
    </>
        
        
  );
}
}
