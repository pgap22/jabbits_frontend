import { Logo } from "../assets/logo";
const BoxCenter = ({
    title,
    children
}) => {
  return (
    <main className="md:min-h-screen flex md:items-center justify-center">
      <div className="border-2 shadow-lg p-4 max-w-lg text-center rounded-md w-[90%] flex flex-col items-center gap-4">
        <img src={Logo} alt="Logo" className="dark:invert" width={200} />
        <h1 className="font-bold text-2xl">{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default BoxCenter;
