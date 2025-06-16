import Lottie from 'react-lottie-player'
import NullAnimation from '../../../../public/animations/nullAnimation.json'


export  const NullPage= ()=> {
  
  return (
    
        <Lottie
        loop={true}
        animationData={NullAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
      
   
  )
}