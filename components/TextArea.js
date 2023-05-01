import { memo } from "react"
import { ConfigProvider, Form, Input } from "antd"
import { Controller, useFormContext } from "react-hook-form"

const TextArea = ({ name, placeholder = "", rows = 6 }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff7001",
              },
            }}
          >
            <Input.TextArea placeholder={placeholder} rows={rows} {...field} />
          </ConfigProvider>
        </Form.Item>
      )}
    />
  )
}

export default memo(TextArea)
