import Home from "../../App";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
        <Home/>
        <Outlet/>
        </>
    )
}