import useAuth from "../hooks/useAuth";

const Auth = ({children}) => {
    const {auth} = useAuth();
    return (
        <>
        {
            auth._id
            ? children[0]
            : children[1]
        }
        </>
    )
}
 
export default Auth;