import Cookies from "universal-cookie";

export function useToken() {
	const cookies = new Cookies()

	const token = cookies.get("access_token");

	const setToken = (value) => {
		cookies.set("access_token", value)
	}

	return {
		token,
		setToken
	};
}