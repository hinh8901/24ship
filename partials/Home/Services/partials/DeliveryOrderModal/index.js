import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import { Alert, Form } from "antd"
import {
  UserOutlined,
  PhoneOutlined,
  AimOutlined,
  ShoppingOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons"
import { FormProvider, useForm } from "react-hook-form"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment/moment"

import { FIELD_REQUIRED, PHONE_ISVALID } from "@/constants/errorMessage"
import TextInput from "@/components/TextInput"
import TextArea from "@/components/TextArea"
import { PHONE_REGEXP } from "@/constants/regexp"
import DistanceInput from "@/components/DistanceInput"
import formatNumber from "@/utils/formatNumber"
import { sendRequest } from "@/sheetRequest"
import SuccessModal from "@/components/SuccessModal"

// From
const fromDefaultValues = {
  benA: "",
  sdt_benA: "",
  dia_chi_benA: "",
  loai_hang: "",
  ghi_chu: "",
}

const fromSchema = object({
  benA: string()
    .trim()
    .required(FIELD_REQUIRED + "họ tên người gửi hàng"),
  sdt_benA: string()
    .trim()
    .required(FIELD_REQUIRED + "số điện thoại người gửi hàng")
    .matches(PHONE_REGEXP, PHONE_ISVALID),
  dia_chi_benA: string()
    .trim()
    .required(FIELD_REQUIRED + "địa chỉ lấy hàng"),
  loai_hang: string()
    .trim()
    .required(FIELD_REQUIRED + "loại hàng"),
})

const fromFormStructure = [
  {
    name: "benA",
    prefix: <UserOutlined />,
    placeholder: "Họ tên người gửi hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "sdt_benA",
    prefix: <PhoneOutlined />,
    placeholder: "Số điện thoại người gửi",
    type: "TEXT_INPUT",
  },
  {
    name: "dia_chi_benA",
    prefix: <AimOutlined />,
    placeholder: "Địa chỉ lấy hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "loai_hang",
    prefix: <ShoppingOutlined />,
    placeholder: "Loại hàng (ví dụ: quần áo, thực phẩm...)",
    type: "TEXT_INPUT",
  },
  {
    name: "ghi_chu",
    placeholder: "Ghi chú cho shipper",
    type: "TEXTAREA",
  },
]

const FromForm = ({ fromMethod, setIsEnableNextStepBtn }) => {
  useLayoutEffect(() => {
    setIsEnableNextStepBtn(fromMethod?.formState?.isValid)
  }, [setIsEnableNextStepBtn, fromMethod?.formState?.isValid])

  return (
    <FormProvider {...fromMethod}>
      <Form layout="vertical" size="large">
        {fromFormStructure.map(({ name, prefix, placeholder, type }) => {
          switch (type) {
            case "TEXT_INPUT":
              return (
                <TextInput
                  key={name}
                  name={name}
                  prefix={prefix}
                  placeholder={placeholder}
                />
              )

            case "TEXTAREA":
              return (
                <TextArea
                  key={name}
                  name={name}
                  prefix={prefix}
                  placeholder={placeholder}
                />
              )
          }
        })}
      </Form>
    </FormProvider>
  )
}

// To
const toDefaultValues = {
  benB: "",
  sdt_benB: "",
  dia_chi_benB: "",
  km: "",
  chi_phi_du_kien: "",
}

const toSchema = object({
  benB: string()
    .trim()
    .required(FIELD_REQUIRED + "họ tên người nhận hàng"),
  sdt_benB: string()
    .trim()
    .required(FIELD_REQUIRED + "số điện thoại người nhận hàng")
    .matches(PHONE_REGEXP, PHONE_ISVALID),
  dia_chi_benB: string()
    .trim()
    .required(FIELD_REQUIRED + "địa chỉ giao hàng"),
  km: string().nullable(),
})

const toFormStructure = [
  {
    name: "benB",
    prefix: <UserOutlined />,
    placeholder: "Họ tên người nhận hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "sdt_benB",
    prefix: <PhoneOutlined />,
    placeholder: "Số điện thoại người nhận",
    type: "TEXT_INPUT",
  },
  {
    name: "dia_chi_benB",
    prefix: <AimOutlined />,
    placeholder: "Địa chỉ giao hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "km",
    prefix: <ColumnWidthOutlined />,
    placeholder: "Khoảng cách ước tính (km)",
    type: "DISTANCE_INPUT",
  },
]

const ToForm = ({ toMethod, setIsEnableNextStepBtn }) => {
  useLayoutEffect(() => {
    setIsEnableNextStepBtn(toMethod?.formState?.isValid)
  }, [setIsEnableNextStepBtn, toMethod?.formState?.isValid])

  return (
    <FormProvider {...toMethod}>
      <Form layout="vertical" size="large">
        {toFormStructure.map(({ name, prefix, placeholder, type }) => {
          switch (type) {
            case "TEXT_INPUT":
              return (
                <TextInput
                  key={name}
                  name={name}
                  prefix={prefix}
                  placeholder={placeholder}
                />
              )

            case "TEXTAREA":
              return (
                <TextArea
                  key={name}
                  name={name}
                  prefix={prefix}
                  placeholder={placeholder}
                />
              )

            case "DISTANCE_INPUT":
              return (
                <DistanceInput
                  key={name}
                  name={name}
                  placeholder={placeholder}
                />
              )
          }
        })}
      </Form>
    </FormProvider>
  )
}

const ConfirmForm = ({
  fromMethod,
  toMethod,
  setOnOkHandler,
  setOnSuccessHandler,
  setOnErrorHandler,
  handleResetServiceForm,
  setIsOpenSuccessModal,
}) => {
  const { reset: resetFromValue, getValues: getFromValues } = fromMethod
  const { reset: resetToValue, getValues: getToValues } = toMethod

  const onSubmit = useCallback(
    () =>
      sendRequest({
        ...getFromValues(),
        ...getToValues(),
        thoi_gian: moment().utcOffset("+0700").format("DD-MM-YYYY HH:mm:ss"),
        dich_vu: "GIAO HANG",
      }),
    [getFromValues, getToValues]
  )

  const onSuccess = useCallback(() => {
    setIsOpenSuccessModal(true)
    resetFromValue(fromDefaultValues)
    resetToValue(toDefaultValues)
    handleResetServiceForm()
  }, [
    resetFromValue,
    resetToValue,
    handleResetServiceForm,
    setIsOpenSuccessModal,
  ])

  const onError = useCallback(() => {}, [])

  useEffect(() => {
    setOnOkHandler(() => onSubmit)
  }, [onSubmit])

  useEffect(() => {
    setOnSuccessHandler(() => onSuccess)
  }, [onSuccess])

  useEffect(() => {
    setOnErrorHandler(() => onError)
  }, [onError])

  const fromBill = (
    <ul>
      <li>Người gửi: {getFromValues("benA")}</li>
      <li>Số điện thoại: {getFromValues("sdt_benA")}</li>
      <li>Địa chỉ lấy hàng: {getFromValues("dia_chi_benA")}</li>
      <li>Loại hàng: {getFromValues("loai_hang")}</li>
      {getFromValues("ghi_chu") && <li>Ghi chú: {getFromValues("ghi_chu")}</li>}
    </ul>
  )

  const toBill = (
    <ul>
      <li>Người nhận: {getToValues("benB")}</li>
      <li>Số điện thoại: {getToValues("sdt_benB")}</li>
      <li>Địa chỉ giao hàng: {getToValues("dia_chi_benB")}</li>
      {getToValues("km") && (
        <li>Khoảng cách dự kiến: {formatNumber(getToValues("km"))}Km</li>
      )}
      {getToValues("chi_phi_du_kien") && (
        <li>
          Chi phí dự kiến: {formatNumber(getToValues("chi_phi_du_kien"))}đ
        </li>
      )}
    </ul>
  )

  return (
    <>
      <Alert
        message={<strong>Thông tin người gửi</strong>}
        description={fromBill}
      />
      <Alert
        message={<strong>Thông tin người nhận</strong>}
        description={toBill}
        type="success"
        style={{ marginTop: 10 }}
      />
    </>
  )
}

const DeliveryOrderModal = ({
  currentStep,
  setIsEnableNextStepBtn,
  setOnOkHandler,
  setOnSuccessHandler,
  setOnErrorHandler,
  handleResetServiceForm,
}) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const fromMethod = useForm({
    resolver: yupResolver(fromSchema),
    defaultValues: fromDefaultValues,
    mode: "onChange",
  })

  const toMethod = useForm({
    resolver: yupResolver(toSchema),
    defaultValues: toDefaultValues,
    mode: "onChange",
  })

  const currentForm = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <FromForm
            fromMethod={fromMethod}
            setIsEnableNextStepBtn={setIsEnableNextStepBtn}
          />
        )

      case 1:
        return (
          <ToForm
            toMethod={toMethod}
            setIsEnableNextStepBtn={setIsEnableNextStepBtn}
          />
        )

      case 2:
        return (
          <ConfirmForm
            fromMethod={fromMethod}
            toMethod={toMethod}
            setOnOkHandler={setOnOkHandler}
            setOnSuccessHandler={setOnSuccessHandler}
            setOnErrorHandler={setOnErrorHandler}
            handleResetServiceForm={handleResetServiceForm}
            setIsOpenSuccessModal={setIsOpenSuccessModal}
          />
        )
    }
  }, [
    currentStep,
    JSON.stringify(fromMethod),
    JSON.stringify(toMethod),
    setIsEnableNextStepBtn,
    setOnOkHandler,
    setOnSuccessHandler,
    setOnErrorHandler,
    handleResetServiceForm,
  ])

  return (
    <>
      <SuccessModal
        isOpen={isOpenSuccessModal}
        setIsOpen={setIsOpenSuccessModal}
        title="Tuyệt vời! Đơn hàng được tạo thành công"
        subTitle="Shipper sẽ liên lạc với bạn ngay bây giờ. Vui lòng để ý điện thoại để đơn hàng được giao đi sớm nhất nhé."
      />
      {currentForm}
    </>
  )
}

export default memo(DeliveryOrderModal)
