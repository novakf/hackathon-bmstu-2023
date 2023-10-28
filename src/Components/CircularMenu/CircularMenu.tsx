import "./CircularMenu.sass"
import CircularMenuItem from "./CircularMenuItem/CircularMenuItem";
import {useEffect, useRef, useState} from "react";


const CircularMenu = () => {

	const degresss = [
		0,
		45,
		90,
		135,
		180,
		225,
		270,
		315
	]

	const [open, setOpen] = useState<boolean>(false)

	const ref = useRef(null)

	const handleClickOutside = (event) => {
		console.log("handleClickOutside")
		if (ref.current && ref.current.contains(event.target)) {
			console.log("asdf")
			console.log(open)
			setOpen(!open)
			console.log(open)
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return (
		<div className={"circular-menu " + (open ? "open" : "")} ref={ref}>
			{ degresss.map((deg, index) => {
				return <CircularMenuItem rotation={deg} index={index}/>
			}) }
		</div>
	)
}

export default CircularMenu;