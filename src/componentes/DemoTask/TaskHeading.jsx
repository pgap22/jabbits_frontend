const TaskHeading = ({title, active}) => {
    return ( 
    <div className="flex flex-col justify-between">
        <h2 className="p-2 font-bold">{title}</h2>
        {active ? <div className="dark:border-white dark:bg-white border-2 bg-black border-black rounded-full"></div>  : null}   
    </div>
     );
}
 
export default TaskHeading;