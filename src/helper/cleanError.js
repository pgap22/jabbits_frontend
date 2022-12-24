const cleanError = (state,dispatch,input) => {
    return{
        onClick: ()=>{dispatch({...state, [input]: ""})},
        onChange: ()=>{dispatch({...state, [input]: ""})},
    }
}

export default cleanError