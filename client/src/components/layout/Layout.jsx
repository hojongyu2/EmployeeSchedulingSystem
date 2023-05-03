import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <> 
            <div>
                <Header />
            </div>
            <div style={{padding:'100px'}}>
                <Outlet />
            </div>
        </>
    )
}