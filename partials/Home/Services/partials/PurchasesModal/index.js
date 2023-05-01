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

// customer information
const customerDefaultValues = {
  benA: "",
  sdt_benA: "",
  dia_chi_benB: "",
}

const customerSchema = object({
  benA: string()
    .trim()
    .required(FIELD_REQUIRED + "họ tên người đặt hàng"),
  sdt_benA: string()
    .trim()
    .required(FIELD_REQUIRED + "số điện thoại người đặt hàng")
    .matches(PHONE_REGEXP, PHONE_ISVALID),
  dia_chi_benB: string()
    .trim()
    .required(FIELD_REQUIRED + "địa chỉ giao hàng"),
})

const customerFormStructure = [
  {
    name: "benA",
    prefix: <UserOutlined />,
    placeholder: "Họ tên người đặt hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "sdt_benA",
    prefix: <PhoneOutlined />,
    placeholder: "Số điện thoại người đặt hàng",
    type: "TEXT_INPUT",
  },
  {
    name: "dia_chi_benB",
    prefix: <AimOutlined />,
    placeholder: "Địa chỉ giao hàng",
    type: "TEXT_INPUT",
  },
]

const CustomerForm = ({ customerMethod, setIsEnableNextStepBtn }) => {
  useLayoutEffect(() => {
    setIsEnableNextStepBtn(customerMethod?.formState?.isValid)
  }, [setIsEnableNextStepBtn, customerMethod?.formState?.isValid])

  return (
    <FormProvider {...customerMethod}>
      <Form layout="vertical" size="large">
        {customerFormStructure.map(({ name, prefix, placeholder, type }) => {
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
const cartDefaultValues = {
  ghi_chu: "",
  km: "",
  chi_phi_du_kien: "",
}

const cartSchema = object({
  ghi_chu: string().required(FIELD_REQUIRED + "thông tin đơn hàng"),
  km: string().nullable(),
})

const cartStructure = [
  {
    name: "ghi_chu",
    prefix: <ColumnWidthOutlined />,
    placeholder:
      "Thông tin về đơn hàng của bạn. \n - Để thuận tiện cho việc đọc đơn hàng, bạn vui lòng mô tả đơn hàng theo mẫu sau: \n + Sản phẩm - Số lượng (khối lượng hoặc số tiền) - Cửa hàng muốn mua \n Ví dụ: Thịt lợn - 50 ngàn - cửa hàng nhà bà A",
    type: "TEXTAREA",
    rows: 10,
  },
  {
    name: "km",
    prefix: <ColumnWidthOutlined />,
    placeholder: "Khoảng cách ước tính (km)",
    type: "DISTANCE_INPUT",
  },
]

const CartForm = ({ cartMethod, setIsEnableNextStepBtn }) => {
  useLayoutEffect(() => {
    setIsEnableNextStepBtn(cartMethod?.formState?.isValid)
  }, [setIsEnableNextStepBtn, cartMethod?.formState?.isValid])

  return (
    <FormProvider {...cartMethod}>
      <Form layout="vertical" size="large">
        {cartStructure.map(({ name, prefix, placeholder, type, rows }) => {
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
                  rows={rows}
                />
              )

            case "DISTANCE_INPUT":
              return (
                <DistanceInput
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  estimatedDistanceNote="Khoảng cách dự tính là khoảng cách giữa các điểm mua hàng và điểm giao hàng mà bạn đã chọn trên ứng dụng (được tính bằng km). Bạn có thể kiểm tra khoảng cách đó dựa trên ứng dụng Google Map. Từ đó bạn có thể biết được giá tiền mà mình phải chi trả cho chuyến di chuyển của mình."
                />
              )
          }
        })}
      </Form>
    </FormProvider>
  )
}

const ConfirmForm = ({
  customerMethod,
  cartMethod,
  setOnOkHandler,
  setOnSuccessHandler,
  setOnErrorHandler,
  handleResetServiceForm,
  setIsOpenSuccessModal,
}) => {
  const { reset: resetCustomerValue, getValues: getCustomerValues } =
    customerMethod
  const { reset: resetCartValue, getValues: getCartValues } = cartMethod

  const onSubmit = useCallback(
    () =>
      sendRequest({
        ...getCustomerValues(),
        ...getCartValues(),
        thoi_gian: moment().utcOffset("+0700").format("DD-MM-YYYY HH:mm:ss"),
        dich_vu: "MUA HANG",
      }),
    [getCustomerValues, getCartValues]
  )

  const onSuccess = useCallback(() => {
    setIsOpenSuccessModal(true)
    resetCustomerValue(customerDefaultValues)
    resetCartValue(cartDefaultValues)
    handleResetServiceForm()
  }, [
    resetCustomerValue,
    resetCartValue,
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

  const customerBill = (
    <ul>
      <li>Người đặt: {getCustomerValues("benA")}</li>
      <li>Số điện thoại: {getCustomerValues("sdt_benA")}</li>
      <li>Địa chỉ giao hàng: {getCustomerValues("dia_chi_benB")}</li>
    </ul>
  )

  const cartBill = (
    <ul>
      <li>Chi tiết đơn hàng: {getCartValues("ghi_chu")}</li>
      {getCartValues("km") && (
        <li>Khoảng cách dự kiến: {formatNumber(getCartValues("km"))}Km</li>
      )}
      {getCartValues("chi_phi_du_kien") && (
        <li>
          Chi phí dự kiến: {formatNumber(getCartValues("chi_phi_du_kien"))}đ
          (Chưa bao gồm tiền mua hàng)
        </li>
      )}
    </ul>
  )

  return (
    <>
      <Alert
        message={<strong>Thông tin người đặt hàng</strong>}
        description={customerBill}
      />
      <Alert
        message={<strong>Thông tin đơn hàng</strong>}
        description={cartBill}
        type="success"
        style={{ marginTop: 10 }}
      />
    </>
  )
}

const PurchasesModal = ({
  currentStep,
  setIsEnableNextStepBtn,
  setOnOkHandler,
  setOnSuccessHandler,
  setOnErrorHandler,
  handleResetServiceForm,
}) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const customerMethod = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: customerDefaultValues,
    mode: "onChange",
  })

  const cartMethod = useForm({
    resolver: yupResolver(cartSchema),
    defaultValues: cartDefaultValues,
    mode: "onChange",
  })

  const currentForm = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <CustomerForm
            customerMethod={customerMethod}
            setIsEnableNextStepBtn={setIsEnableNextStepBtn}
          />
        )

      case 1:
        return (
          <CartForm
            cartMethod={cartMethod}
            setIsEnableNextStepBtn={setIsEnableNextStepBtn}
          />
        )

      case 2:
        return (
          <ConfirmForm
            customerMethod={customerMethod}
            cartMethod={cartMethod}
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
    JSON.stringify(customerMethod),
    JSON.stringify(cartMethod),
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

export default memo(PurchasesModal)
