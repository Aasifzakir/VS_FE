import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { clearActiveUser, clearErrorResponse } from "../Redux/AuthSaga/AuthActions";

const ProtectedRoute = () => {
    const { user: userData, userLoading, unauthorized } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();

    //UNAUTHORIZED
    useEffect(() => {
        if (!unauthorized || userLoading) return;
        if (
            unauthorized?.response?.data?.message === "Token Must be Provided"
        ) {
            return;
        } else if (
            unauthorized?.response?.data?.message === "Token Expired"
        ) {
            toast.error("Session Expired!");
            dispatch(clearActiveUser());
            localStorage.clear();
        } else if (
            !userLoading &&
            unauthorized?.response?.data?.message &&
            unauthorized?.response?.data?.message !== "Token Must be Provided"
        ) {
            toast.error(unauthorized?.response?.data?.message);
        } else if (!userLoading && unauthorized?.message) {
            toast.error(unauthorized?.message);
        }
        dispatch(clearErrorResponse());
    }, [unauthorized, userLoading]);

    if (userLoading && !userData)
        return (
            <div
                style={{ height: "100vh" }}
                className="d-flex flex-column align-items-center justify-content-center"
            >
                <CircularProgress />
                Please wait!...
            </div>
        );

    return userData ? (
        <Outlet />
    ) : (
        <Navigate to="/Login" />
    );
};


export default ProtectedRoute;