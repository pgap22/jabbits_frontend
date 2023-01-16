import { NavLink } from "react-router-dom";
import useNavLinkStyle from "../../hooks/useNavLinkStyle"

const AsideLink = ({ Icon, link, label, toggleMenu }) => {
  const style = useNavLinkStyle(link);
  
  return (
    <>
      <NavLink
        to={link}
        onClick={toggleMenu}
        className={style}
      >
        <div className="flex items-center select-none rounded-md justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <Icon size={28} />
            <p className="text-xl">{label}</p>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default AsideLink;
