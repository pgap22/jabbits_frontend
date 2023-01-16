import {motion} from "framer-motion"
const DashboardLayout = ({children}) => {
  return (
    <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-5 p-6 md:p-8 w-full max-w-[1600px]"
  >
    {children}
  </motion.main>
  )
}

export default DashboardLayout