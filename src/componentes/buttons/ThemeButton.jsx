import {BsTriangleHalf} from "react-icons/bs"
import toggleTheme from "../../helper/toggleTheme";

const ThemeButton = ({style,size=35}) => {     
    return ( 
        <div className={style ?? ''+" px-8 mx-5 border-r-2"}>
            <BsTriangleHalf 
                className="cursor-pointer"
                size={size} 
                onClick={toggleTheme} />
        </div>
     );
}
 
export default ThemeButton;