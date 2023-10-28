import {useSelector} from 'react-redux';

export function useAuth() {
	const {is_authenticated, user_id, user_name} = useSelector(state => state.user);

	return {
		is_authenticated,
		user_id,
		user_name,
	};
}