import {BsTriangleHalf} from "react-icons/bs"
import theme from "../../helper/theme";

const ThemeButton = ({style}) => {
    const toggleTheme = () => { 
        if(localStorage.theme === 'light'){
            theme('dark');
            return
        }
        theme('light');
     }
     
    return ( 
        <div className={style ?? ''+" px-8 mx-5 border-r-2"}>
            <BsTriangleHalf 
                className="cursor-pointer"
                size={35} 
                onClick={toggleTheme} />
        </div>
     );
}
 
export default ThemeButton;