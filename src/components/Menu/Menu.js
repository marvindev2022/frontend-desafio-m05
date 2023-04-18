import {useContext} from "react";
import {ClientsContext} from "./../../context/clientsContext";
import {getItem, setItem} from "../../utils/storage";
import homePink from "../../assets/home-pink.svg";
import clientsPink from "../../assets/clients-pink.svg";
import chargesPink from "./../../assets/charges-pink.svg";
import home from "../../assets/home.svg";
import clients from "../../assets/clients.svg";
import charges from "../../assets/charges.svg";
import "./menu.styles.css";

const menuItems = [
  {id: "home", image: home, activeImage: homePink},
  {id: "clients", image: clients, activeImage: clientsPink},
  {id: "charges", image: charges, activeImage: chargesPink}
];

export default function Menu() {
  const {setSectionSelect, setRender} = useContext(ClientsContext);
  const activeItemId = getItem("sectionSelected") || "home";

  const handleItemClick = itemId => {
    setItem("sectionSelected", itemId);
    setSectionSelect(itemId);
    setRender(prevRender => !prevRender);
  };

  return (
    <menu className="menu-container">
      <ul className="menu-list">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`menu-item ${
              activeItemId === item.id && "border-right"
            }`}
          >
            <img
              onClick={() => handleItemClick(item.id)}
              src={activeItemId === item.id ? item.activeImage : item.image}
              alt={item.id}
              className="menu-image"
            />
          </li>
        ))}
      </ul>
    </menu>
  );
}
