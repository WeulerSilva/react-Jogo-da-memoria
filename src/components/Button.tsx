type Props = {
    label: string;
    icon?: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <div 
            onClick={onClick}
            className="w-48 h-12 flex bg-[#1550FF] rounded-lg cursor-pointer 
                       opacity-100 transition-all duration-3000 ease-in-out
                       hover:opacity-80"    
        >
            {icon &&
                <div className="h-auto flex justify-center items-center border
                            border-white border-opacity-20 py-0 px-4"
                >
                    <img src={icon} alt="" width={20}/>
            </div>
            }           
            <div className="h-auto text-white flex justify-center items-center flex-1 py-0 px-5">{label}</div>
        </div>
    )
}