import AcordeonItem from "./AcordeonItem"

const Acordeon = ({items}) => {
  return (
    <div className="w-full flex flex-col gap-3">
        {items.map(item => (
            <AcordeonItem key={Math.random()} item={item} />
        ))}
    </div>
  )
}

export default Acordeon