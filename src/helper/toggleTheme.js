import theme from "./theme";

export default function toggleTheme () { 
    if(localStorage.theme === 'light'){
        theme('dark');
        return
    }
    theme('light');
 }