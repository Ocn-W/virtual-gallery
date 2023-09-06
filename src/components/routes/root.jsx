import Navigation from "../navigation";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
        <Navigation/>
        <Outlet/>
        </>
    )
}