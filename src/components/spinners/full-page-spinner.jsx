export const FullPageSpinner = () => {
    return (
        <div className="flex flex-col grow items-center justify-center">
            <span className="font-thin text-2xl p-4">Alkermes Compliance Dashboard</span>
            <div className="
                    h-12 
                    w-12 
                    animate-spin 
                    rounded-full 
                    border-4 
                    border-solid 
                    border-current 
                    border-r-transparent 
                    align-[-0.125em] 
                    motion-reduce:animate-[spin_1.5s_linear_infinite]
                "
                role="status"
            >
                <span className="
                    !absolute 
                    !-m-px 
                    !h-px 
                    !w-px 
                    !overflow-hidden 
                    !whitespace-nowrap 
                    !border-0 
                    !p-0 
                    ![clip:rect(0,0,0,0)]
                ">
                    Loading...
                </span>
            </div>
            <span className="p-4 font-thing">Loading...</span>
        </div>
    )
}