import "./Header.sass"
import logo from "../../assets/NASA-Logo.png"

const Header = () => {
    return (
        <div>
            <div className={"header-wrapper"}>
                <img src={logo} className={"logo"} />
            </div>
        </div>
    )
}

export default Header;