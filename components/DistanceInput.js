import { memo, useEffect, useState } from "react"
import { ColumnWidthOutlined, DollarCircleOutlined } from "@ant-design/icons"
import { Alert, ConfigProvider, Form, InputNumber } from "antd"
import { Controller, useFormContext } from "react-hook-form"

import ErrorMessage from "./ErrorMessage"

const DistanceInput = ({
  name,
  estimatedDistanceNote = "Khoảng cách dự tính là khoảng cách giữa điểm đi và điểm đến mà bạn đã chọn trên ứng dụng (được tính bằng km). Bạn có thể kiểm tra khoảng cách đó dựa trên ứng dụng Google Map. Từ đó bạn có thể biết được giá tiền mà mình phải chi trả cho chuyến di chuyển của mình.",
}) => {
  const { control, setValue, getValues } = useFormContext()
  const [distance, setDistance] = useState(() => getValues(name) ?? 0)

  useEffect(() => {
    if (!distance) return setValue("chi_phi_du_kien", "")
    const expense =
      distance <= 3 ? 10000 : distance < 20 ? distance * 4000 : distance * 3000

    setValue("chi_phi_du_kien", expense)
  }, [distance, setValue])

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <>
            <Form.Item style={{ marginBottom: 4 }}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ff7001",
                  },
                }}
              >
                <InputNumber
                  addonBefore={<ColumnWidthOutlined />}
                  prefix="Khoảng cách dự tính"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  className="w100"
                  onChange={(e) => {
                    onChange(e)
                    setDistance(e)
                  }}
                  min={1}
                  {...restField}
                />
              </ConfigProvider>
              <Alert
                message={<b>Khoảng cách dự tính là gì?</b>}
                description={estimatedDistanceNote}
                type="info"
                showIcon
                style={{ marginTop: 4 }}
              />
              <ErrorMessage message={error?.message} />
            </Form.Item>
            <Controller
              control={control}
              name="chi_phi_du_kien"
              render={({ field }) => {
                return (
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgContainerDisabled: "transparent",
                        colorTextDisabled: "#ff7001",
                      },
                    }}
                  >
                    <Form.Item>
                      <InputNumber
                        disabled
                        className="w100"
                        addonBefore={<DollarCircleOutlined />}
                        prefix={<p className="blackColor">Chi phí dự kiến:</p>}
                        {...field}
                        formatter={(value) =>
                          `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/đ/g, "")}
                      />
                    </Form.Item>
                  </ConfigProvider>
                )
              }}
            />
          </>
        )
      }}
    />
  )
}

export default memo(DistanceInput)
