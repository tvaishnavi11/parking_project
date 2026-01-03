import Lottie from "lottie-react";
import parkingAnim from "assest"

const LottieAnimation = () => {
  return (
    <div className="w-72 mx-auto">
      <Lottie animationData={parkingAnim} loop />
    </div>
  );
};

export default LottieAnimation;
