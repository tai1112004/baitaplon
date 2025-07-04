import Lottie from 'react-lottie-player'
import DeleteAnimation from '../../../../public/animations/delete.json'


export const DelPage= ()=> {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9999]">
      <div className="
          bg-white rounded-xl shadow-lg flex flex-col items-center w-[500px] p-[10px] 
          transform transition-all duration-500
          translate-y-0 opacity-100" >
    
      <Lottie
        loop={true}
        animationData={DeleteAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
    </div>
  )
}