import { memo, useMemo } from "react"
import { Badge, Alert } from "antd"

import PRICE_LIST from "@/mocks/Home/priceList"

const PriceTable = () => {
  const PRICE_TABLE = useMemo(
    () =>
      PRICE_LIST.map((item, index) => (
        <Badge
          key={index}
          status="processing"
          text={
            <strong>
              <span style={{ color: "white", background: "#1677ff" }}>
                {" " + item.title + " "}
              </span>{" "}
              - <span className="fw-500">{item.des}</span>
            </strong>
          }
          className={index ? "mt-0_6" : ""}
        />
      )),
    []
  )

  return (
    <section id="price-list" className="p-1 container">
      <Badge.Ribbon text="Bảng giá" color="red">
        <Alert message={PRICE_TABLE} className="p-ver-3" />
      </Badge.Ribbon>
    </section>
  )
}

export default memo(PriceTable)
