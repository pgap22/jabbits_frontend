import { useEffect, useState } from "react"

const useInputError = (error)=>{
    const [inputError, c] = useState("");

    useEffect(() => {
      c(error);
    }, [error]);

    return inputError;
}

export default useInputError