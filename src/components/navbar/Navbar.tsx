import "./navbar.scss"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img height="60px" width="100px" src="pvrd-light.png" alt="" />
        
      </div>

      <div className="icons">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>PVRD Admin</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  )
}

export default Navbar
