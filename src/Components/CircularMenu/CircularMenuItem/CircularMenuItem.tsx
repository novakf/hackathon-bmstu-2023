import "./CirularMenuItem.sass"
import {FaArrowRight} from "react-icons/fa";

const CircularMenuItem = ({rotation, index}:{rotation:number, index:number}) => {

	return (
		<div className="menu-item" style={{
			transform: `rotate(${rotation}deg) translate(175%)`
		}} onClick={() => {console.log("click index №" + index)}} >
			<FaArrowRight />
		</div>
	)
}

export default CircularMenuItem;