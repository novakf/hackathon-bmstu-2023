import {Link} from "react-router-dom";
import "./ProfileMenu.sass"
import {useAuth} from "/src/hooks/useAuth";
import {useState} from "react";
import UserInfo from "./UserInfo/UserInfo";

const ProfileMenu = () => {

    const {is_authenticated, user_name} = useAuth()

    if (is_authenticated)
    {
        return (
            <div className={"profile-menu-wrapper"}>

                <div className={"menu-wrapper"}>

                    <div className="menu-item">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span className="item">Главная</span>
                        </Link>
                    </div>

                    <UserInfo />

                </div>
            </div>
        )
    }

    return (
        <div className={"profile-menu-wrapper"}>

            <div className={"menu-wrapper"}>

                <Link to="/" className="menu-item" style={{ textDecoration: 'none' }}>
                    <span className="item">Главная</span>
                </Link>

                <Link to="/login" className="menu-item" style={{ textDecoration: 'none' }}>
                    <span className="item">Вход</span>
                </Link>

            </div>

        </div>

    )
}

export default ProfileMenu;