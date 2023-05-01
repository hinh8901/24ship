import { memo, useMemo } from "react"
import Image from "next/image"
import { Button, Carousel, ConfigProvider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"

import COVER_CAROUSEL from "@/mocks/Home/coverCarousel"
import styles from "./styles.module.css"

const Header = () => {
  const COVER_SLIDER = useMemo(
    () =>
      COVER_CAROUSEL.map((item) => (
        <div className={`${styles.cover} relative`} key={item.key}>
          <Image src={item.src} fill alt="24ship cover" priority />
        </div>
      )),
    []
  )

  return (
    <section id="header" className="container lightGrayBg radius-8 pb-2_8">
      <div>
        <div className="w100 relative">
          <Carousel
            autoplay
            dotPosition="right"
            autoplaySpeed={3600}
            speed={800}
          >
            {COVER_SLIDER}
          </Carousel>
          <div className={`${styles.avatar} circleRadius absolute`}></div>
        </div>
        <div className={styles.headerPadding}></div>
      </div>
      <h1 className="bigTitle p-1_6 pb-1_8">24h Ship - Dịch vụ vận chuyển</h1>
      <div className="flex">
        <ConfigProvider
          theme={{
            token: {
              paddingContentHorizontal: 28,
              colorPrimaryActive: "#ff8c33",
              colorPrimaryHover: "#ff7001",
            },
          }}
        >
          <Button
            type="primary"
            href="tel: 0868706226"
            size="large"
            className="primaryBg ml-1_6 mr-1_6 p-hoz-2"
          >
            <FontAwesomeIcon icon={faPhone} />
            <span className="ml-1 fw-500">Liên hệ trực tiếp</span>
          </Button>
        </ConfigProvider>
        <a href="" className="blueColor" target="_blank">
          <FontAwesomeIcon icon={faFacebook} className="fs-3_6 alignCenter" />
        </a>
      </div>
    </section>
  )
}

export default memo(Header)
