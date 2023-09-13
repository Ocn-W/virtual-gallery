import Navigation from "../navigation";
import App from "../../App";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
        {/* <Navigation/> */}
        <App/>
        <Outlet/>
        </>
    )
}