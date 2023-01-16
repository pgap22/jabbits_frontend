import { useLocation } from "react-router-dom";
export default function useNavLinkStyle(path) {
  const location = useLocation();

  if (location.pathname == path)
    return "bg-gray-200 dark:bg-[#3A3A3A] dark:text-white text-gray-700 mx-3 px-3 py-3 rounded-md ";
  return "mx-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-[#3A3A3A] rounded-md";
}
