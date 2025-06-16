import Lottie from 'react-lottie-player'
import notfoundAnimation from '../../../../public/animations/notfound.json'

export  const NotfoundPage= ()=> {
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie
        loop={true}
        animationData={notfoundAnimation}
        play
        style={{ width: 1000, height: 500 }}
      />
    </div>
      
   
  )
}