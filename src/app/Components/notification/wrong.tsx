import Lottie from 'react-lottie-player'
import wrongAnimation from '../../../../public/animations/wrong.json'
type props = {
   data :{
    title: string  ; 
  } , 
}
export const WrongPage =({data}:props)=> {
      
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9999]">
      <div className="
          bg-white rounded-xl shadow-lg flex flex-col items-center w-[500px] p-[10px] 
          transform transition-all duration-500
          translate-y-0 opacity-100" >
    
      <Lottie
        loop={false}
        animationData={wrongAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
      <h1 className="text-2xl font-bold text-green-400 mt-4 text-center">{data.title}  </h1>
      <p className="text-gray-600 mt-2">
        Bạn hãy thử làm lại xem nhé 
      </p>
    </div>
    </div>
  )
}