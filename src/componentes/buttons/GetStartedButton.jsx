const GetStartedButton = ({text,click}) => {
    return ( 
        <button className="dark:border dark:border-white p-3 transition-all px-6 bg-black text-white rounded-md cursor-pointer select-none border-2 hover:bg-white hover:border-black hover:text-black ">
            <p className="font-medium">{text}</p>
        </button>
     );
}
 
export default GetStartedButton;