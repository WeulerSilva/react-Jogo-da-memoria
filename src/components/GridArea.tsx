import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const GridArea = ({children}: Props) => {

    return (
        <div className="flex-1 flex justify-center my-0 mx-5 md:justify-end md:mx-0">
            <div className="w-[430px] grid grid-cols-3 gap-2 md:grid-cols-4">
                    {children}
            </div>
        </div>
    )
}