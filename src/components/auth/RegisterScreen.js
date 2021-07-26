import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
    const dispatch = useDispatch();

    const { msgError } = useSelector((state) => state.ui);

    const { formValues, handleInputChange } = useForm({
        name: "José",
        email: "jose@mail.com",
        password: "123456",
        password2: "123456",
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError("Name is required"));

            return false;
        }

        if (!validator.isEmail(email.trim())) {
            dispatch(setError("Email is not valid"));

            return false;
        }

        if (!validator.equals(password, password2) || password.length < 6) {
            dispatch(setError("Invalid password"));

            return false;
        }

        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                )}

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Login
                </button>

                <Link to="/auth/login" className="link">
                    Alredy registered?
                </Link>
            </form>
        </>
    );
};
