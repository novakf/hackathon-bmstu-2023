import "./LoginPage.sass"
import {FaLock, FaUser} from "react-icons/fa6";

const LoginForm = () => {

    const login = (formData) => {
        console.log(formData)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        login(formData)
    }


    return (
        <div className="auth-container">

            <div className="header">

                <div className="text">
                    Вход
                </div>

            </div>

            <form className="inputs" action="POST" onSubmit={(e) => handleSubmit(e)}>

                <div className="input">
                    <FaUser />
                    <input type="text" name="username" placeholder="Имя"/>
                </div>

                <div className="input">
                    <FaLock />
                    <input type="password" name="password"  placeholder="Пароль"/>
                </div>

                <button className="submit-button">
                    Войти
                </button>

            </form>

        </div>
    )
}

export default LoginForm;