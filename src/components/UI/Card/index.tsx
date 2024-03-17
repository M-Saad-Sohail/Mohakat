type TProps = {
    heading: string | [string],
    value: number | string,
    classname?: string
    titleclass?: string
    valueclass?: string
}
const InfoCards = ({ heading, value, classname, valueclass, titleclass }: TProps) => {
    return (<div className={`bg-primary p-[25px] rounded-[5px] h-[140px] ${classname}`}>
        <div className={`${titleclass} mb-0 text-sm text-white font-bold`}>{heading}</div>
        <div className={`${valueclass} font-bold text-white float-right`}>{value}</div>
  
    </div>)
}
export default InfoCards