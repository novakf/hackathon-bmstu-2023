import "./UserInfo.sass"
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {logOut} from "/src/store/authSlice";
import Cookies from "universal-cookie";
import {useAuth} from "/src/hooks/useAuth";
import {ImExit} from "react-icons/im";
import user_avatar from "./user.png";
import {useNavigate } from "react-router-dom";

const UserInfo = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cookies = new Cookies()

	const {user_name} = useAuth()

	const [open, setOpen] = useState<boolean>(false)


	const ref1 = useRef(null);

	const ref2 = useRef(null);

	const handleClickOutside = (event) => {
		if (ref1.current && !ref1.current.contains(event.target) && !ref2.current.contains(event.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	const doLogOut = () => {
		dispatch(logOut())
		cookies.set("access_token", undefined)
		cookies.set("refresh_token", undefined)
		navigate("/login")
	}

	return (
		<div>
			<img src={user_avatar} className="user-avatar" onClick={(e) => setOpen(!open)} ref={ref2}/>

			<div className={"user-info-wrapper " + (open ? "open" : "")} ref={ref1}>
				<span>Имя: {user_name}</span>
				<button onClick={doLogOut}>
					Выйти
					<ImExit />
				</button>
			</div>
		</div>
	)
}

export default UserInfo;