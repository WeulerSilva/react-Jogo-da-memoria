type Props = {
    value: string;
    label: string;
}

export const InfoAreaInfo = ({label, value}: Props) => {
    return (
        <>
            <h6 className="text-base text-[#6A7D8B]">{label}</h6>
            <p className="text-4xl font-bold text-[#101C40]">{value}</p>
        </>
    )
} 