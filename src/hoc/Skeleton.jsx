const Skeleton = ({
    value,
    children,
    skeleton
}) => {
 if(value) return children
 return skeleton
};

export default Skeleton;
