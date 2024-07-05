import { Link, } from "react-router-dom"
import "./menu.scss"
import { menu } from "../../data"
const Menu = () => {
  return (
    <div className="menu">
      {menu.map(item => (

        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItem.map(litsItem => (

            <Link to={litsItem.url} className="listItem" key={litsItem.id}>
              <img src={litsItem.icon} alt="" />
              <span className="listItemTitle">{litsItem.title} </span>
            </Link>
          ))}


        </div>
      ))}
    </div>
  )
}

export default Menu
