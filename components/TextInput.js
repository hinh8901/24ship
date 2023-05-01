import { memo } from "react"
import { ConfigProvider, Form, Input } from "antd"
import { Controller, useFormContext } from "react-hook-form"
import { CloseCircleOutlined } from "@ant-design/icons"

import ErrorMessage from "./ErrorMessage"

const TextInput = ({ name, placeholder = "", prefix = "" }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          style={{ paddingBottom: 24, marginBottom: 0 }}
          className="relative"
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff7001",
              },
            }}
          >
            <Input
              placeholder={placeholder}
              prefix={prefix}
              {...field}
              suffix={
                error?.message ? (
                  <CloseCircleOutlined style={{ color: "red" }} />
                ) : (
                  ""
                )
              }
            />
          </ConfigProvider>
          <ErrorMessage message={error?.message} />
        </Form.Item>
      )}
    />
  )
}

export default memo(TextInput)
