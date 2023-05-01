import Image from "next/image"

const Service = ({ icon, title }) => {
  return (
    <div className="flex flexCenter p-1_6 flexCol pointer">
      <div className="iconSize relative circleRadius lightGrayBg flexShrink-0">
        <Image src={icon} fill alt={icon} />
      </div>
      <h4 className="mt-0_6 textCenter">{title}</h4>
    </div>
  )
}

export default Service
