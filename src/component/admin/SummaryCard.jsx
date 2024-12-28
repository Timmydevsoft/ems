
const SummaryCard = ({icon, text, number, color})=>{
    return(
        <div className="flex bg-white rounded-md">
            <div className={`flex items-center justify-center ${color} text-white text-3xl w-16`}>
                {icon}
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    )
}
export default SummaryCard