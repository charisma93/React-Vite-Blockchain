import { FullPageSpinner } from "@components/spinners";
import { NavBar } from "@components/nav";
import { Header } from "@components/header";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const AppLayout = () => {
    const [layoutLoading, setLayoutLoading] = useState(true);
    const location = useLocation();
    //add auth hooks here if needed
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLayoutLoading(false);
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    })

    if(layoutLoading) {
        return <FullPageSpinner />
    }

    return (
        <div className="flex flex-col grow">
            <div className="flex flex-col grow-0">
                <Header />
            </div>
            <div className="flex flex-col grow-0">
                <NavBar 
                    activeRoute={location.pathname}
                />
            </div>
            <div className="flex flex-col grow">
                <Outlet />
            </div>
        </div>
    )
}