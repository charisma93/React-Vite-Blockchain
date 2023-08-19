import { 
    //useLoaderData, //implement in future if needed
    useOutlet 
} from "react-router-dom";
//import auth provider here when needed

export const RootLayout = () => {
    const outlet = useOutlet();

    return (
        <div className="max-w-full container dark:bg-black">
            <div className="
                flex
                flex-col
                container 
                min-h-screen
                h-full
                border-l-2 border-r-2
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-slate-200
            ">
                {outlet}
            </div>
        </div>
    )
}