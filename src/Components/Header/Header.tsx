import "./Header.sass"
import logo from "../../icons/NASA-Logo.png"
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Header = () => {
    return (
        <div>
            <div className={"header-wrapper"}>
                <img src={logo} className={"logo"} />

                <ProfileMenu />
            </div>
        </div>
    )
}

export default Header;