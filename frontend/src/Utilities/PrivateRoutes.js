import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NevHead from '../components/NevHead';
const PrivateRoutes = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("review_token")) {
            navigate("/")
        }
    }, []);
    let auth = { token: false }
    if (localStorage.getItem("review_token") !== null) {
        auth.token = true
    }
    else
        auth.token = false
    return (
        <>
            {
                auth.token ?
                    <>
                        {/* <NavHead /> */}
                        <NevHead />
                        <Outlet />
                        {/* <Footer /> */}
                    </>
                    : <Navigate to={'/'} />
            }
        </>
    )
}
export default PrivateRoutes
