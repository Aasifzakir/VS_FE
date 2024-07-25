import React, { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import InputField from "../../Components/InputField";
import { loginRequest, loginResClear } from "../../Redux/AuthSaga/AuthActions";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [showPassword, setShowPassword] = React.useState(false);
    // const handleClickShowPassword = () => setShowPassword(!showPassword);

    const { user, loginResponse, loginLoading } = useSelector(
        (state) => state.authReducer
    );

    const validationArray = Yup.object().shape({
        email: Yup.string()
            .matches(/^\s*\S[\s\S]*$/g, "Email cannot contain only blankspaces")
            .email("Invalid Email")
            .required("Email is required!"),

        password: Yup.string()
            .matches(/^\s*\S[\s\S]*$/g, "Password cannot contain only blankspaces")
            .required("Password is required!"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationArray,
        onSubmit: (values) => {
            dispatch(loginRequest(values));
        },
    });

    useEffect(() => {
        if (loginResponse) {
            if (loginResponse && loginResponse.success) {
                toast.success(`${loginResponse.message}`);
            } else if (loginResponse?.response?.data?.message) {
                toast.error(loginResponse?.response?.data?.message);
            } else {
                toast.error(loginResponse?.message);
            }
        }
        dispatch(loginResClear());
    }, [loginResponse]);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="lognWrappr">
            <div className="lgnFrmWrp">
                <div className="login_top">
                    
                    <h1 className="title">VITASOFT</h1>
                    <h1>Login</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <InputField
                                labelText={"Email"}
                                placeholder="Enter your email"
                                type="text"
                                name="email"
                                size="large"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                errorMsg={formik.touched?.email && formik.errors?.email}
                            />
                        </div>
                        <div className="col-12">
                            <InputField
                                labelText={"Password"}
                                placeholder="Enter your password"
                                type={"password"}
                                name="password"
                                size="large"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMsg={formik.touched?.password && formik.errors?.password}
                            />
                        </div>
                    </div>

                    <div className="form_action_btns">
                        <button
                            label={loginLoading ? "Loading..." : "Login"}
                            type="submit"
                            disabled={loginLoading}
                            className="primary"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;