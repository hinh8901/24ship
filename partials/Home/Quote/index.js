import { Affix } from "antd"
import { memo } from "react"
import Marquee from "react-fast-marquee"

const Quote = () => {
  return (
    <Affix offsetBottom={0}>
      <Marquee
        gradient={false}
        className="primaryBg fw-500 whiteColor p-1 fs-1_2"
        speed={36}
      >
        Chúc quý khách có những giây phút trải nghiệm dịch vụ tuyệt vời cùng 24h
        Ship! Vạn dặm bình an.
      </Marquee>
    </Affix>
  )
}

export default memo(Quote)
