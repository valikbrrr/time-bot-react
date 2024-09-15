import { useNavigate } from "react-router-dom"


interface BackArrowProps {
  lastPage: string; // Указываем тип
}

const BackArrow: React.FC<BackArrowProps> = ({lastPage}) => {
   const navigate = useNavigate()
 return (
   <div 
      onClick={() => navigate(lastPage)}
      className="pt-8 pl-5 w-9">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:scale-110 hover:text-gray-300"><path d="m15 18-6-6 6-6"/></svg>
   </div>
 )
}

export default BackArrow