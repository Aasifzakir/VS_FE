import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField";
import { useFormik } from "formik";
import "./index.css";
import * as Yup from "yup";
import PhoneNumber from "../../Components/PhoneNumberField";
import Dropdown from "../../Components/DropDown";
import { Country, State } from 'country-state-city';
import PreviewDetails from "./Comps/PreviewDetails";
import Header from "../../Components/Header";
import Dialog from "./Comps/Dialog";
import { postUserRequest, postUserResClear } from "../../Redux/AuthSaga/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { postUserResponse } = useSelector(state => state.authReducer)
    const [checkphone, setCheckphone] = useState(0);
    const [formData, setFormData] = useState({ open: false, data: null });

    const openPreview = (data) => {
        setFormData({ open: true, data: data })
    }

    const closePreview = () => {
        setFormData({ open: false, data: null })
    }

    const formik = useFormik({
        initialValues: {
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            height: "",
            weight: "",
            address: "",
            country: "",
            state: "",
            city: "",
            zip_code: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required("Required"),
            middle_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            email: Yup.string().required("Required").email("Please enter valid email"),
            phone_number: Yup.string()
                .required("Required")
                .test("check phone", "Phone number is invalid", (number) => {
                    return !(number && checkphone !== number.length);
                }),
            height: Yup.number().required("Required"),
            weight: Yup.number().required("Required"),
            address: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            zip_code: Yup.number().required("Required"),
            password: Yup.string().required("Required").min(6, "Minimum of 6 characters"),
            confirm_password: Yup.string().required("Required").oneOf([Yup.ref('password'), ""], "Password must match"),
        }),
        onSubmit: (values) => {
            openPreview(values)
        },
    });

    useEffect(() => {
        if (!postUserResponse) return;
        if (postUserResponse.success) {
            toast.success(postUserResponse.message);
            closePreview()
            navigate('/login')
        } else if (postUserResponse.message) {
            toast.error(postUserResponse.message)
        }
        dispatch(postUserResClear())
    }, [postUserResponse])
    return (
        <div className="container">
            <Header />
            <div className="register_container container">
                <h3 className="text-center">Register Yourself</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="col_2">
                        <InputField
                            labelText={"First Name"}
                            placeholder="Enter First Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"first_name"}
                            required
                            value={formik.values?.first_name}
                            errorMsg={formik.touched?.first_name && formik.errors?.first_name}
                        />
                        <InputField
                            labelText={"Middle Name"}
                            placeholder="Enter Middle Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"middle_name"}
                            required
                            value={formik.values?.middle_name}
                            errorMsg={formik.touched?.middle_name && formik.errors?.middle_name}
                        />
                        <InputField
                            labelText={"Last Name"}
                            placeholder="Enter Last Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"last_name"}
                            required
                            value={formik.values?.last_name}
                            errorMsg={formik.touched?.last_name && formik.errors?.last_name}
                        />
                        <InputField
                            labelText={"Email"}
                            placeholder="Enter Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"email"}
                            type={"email"}
                            required
                            value={formik.values?.email}
                            errorMsg={formik.touched?.email && formik.errors?.email}
                        />
                        <PhoneNumber
                            value={formik.values.phone_number}
                            onChange={formik.setFieldValue}
                            labelText="Phone Number"
                            name="phone_number"
                            placeholder="Enter phone number"
                            required
                            onBlur={formik.handleBlur}
                            validcheck={setCheckphone}
                            errorMsg={
                                formik.touched.phone_number && formik.errors?.phone_number
                            }
                        />
                        <InputField
                            labelText={"Height (ft/inches)"}
                            placeholder="Enter Height"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"height"}
                            required
                            type={"number"}
                            value={formik.values?.height}
                            errorMsg={formik.touched?.height && formik.errors?.height}
                        />
                        <InputField
                            labelText={"Weight (Kgs)"}
                            placeholder="Enter Weight"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"weight"}
                            type={"number"}
                            required
                            value={formik.values?.weight}
                            errorMsg={formik.touched?.weight && formik.errors?.weight}
                        />
                        <InputField
                            labelText={"Address"}
                            placeholder="Enter Address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"address"}
                            required
                            value={formik.values?.address}
                            errorMsg={formik.touched?.address && formik.errors?.address}
                        />
                        <Dropdown
                            labelText={"Country"}
                            name={"country"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.country}
                            required
                            errorMsg={formik.touched?.country && formik.errors?.country}
                            placeholder={"Choose country"}
                            data={Country.getAllCountries()}
                            setValue="isoCode"
                        />
                        <Dropdown
                            labelText={"State"}
                            name={"state"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.state}
                            errorMsg={formik.touched?.state && formik.errors?.state}
                            required
                            placeholder={"Choose state"}
                            data={formik.values?.country ? State.getStatesOfCountry(formik.values?.country) : []}
                        />
                        <InputField
                            labelText={"City"}
                            placeholder="Enter city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"city"}
                            required
                            value={formik.values?.city}
                            errorMsg={formik.touched?.city && formik.errors?.city}
                        />
                        <InputField
                            labelText={"Zip code"}
                            placeholder="Enter Zip code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"zip_code"}
                            type={"number"}
                            required
                            value={formik.values?.zip_code}
                            errorMsg={formik.touched?.zip_code && formik.errors?.zip_code}
                        />
                        <InputField
                            labelText={"Password"}
                            placeholder="Enter password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"password"}
                            type={"password"}
                            required
                            value={formik.values?.password}
                            errorMsg={formik.touched?.password && formik.errors?.password}
                        />
                        <InputField
                            labelText={"Confirm password"}
                            placeholder="Repeat your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={"confirm_password"}
                            type={"password"}
                            required
                            value={formik.values?.confirm_password}
                            errorMsg={formik.touched?.confirm_password && formik.errors?.confirm_password}
                        />
                    </div>
                    <div className="form_action_btns">
                        <button type="submit" className="primary">
                            Preview
                        </button>
                    </div>
                </form>

                {/* Preview */}
                <Dialog
                    title={"Preview"}
                    open={formData.open}
                    handleClose={closePreview}
                    maxWidth="lg"
                >
                    <PreviewDetails value={formData.data} onSubmit={() => {
                        dispatch(postUserRequest(formData.data))
                    }} />
                </Dialog>
            </div>
        </div>
    );
}
