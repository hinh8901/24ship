import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { Row, Col, Badge, Modal, message, Steps, ConfigProvider } from "antd"
import { useMutation } from "@tanstack/react-query"

import Service from "@/components/Service"
import SERVICES from "@/mocks/Home/services"
import styles from "./styles.module.css"

const Services = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [serviceModalConfig, setServiceModalConfig] = useState({})
  const [messageApi, contextHolder] = message.useMessage()
  const [currentStep, setCurrentStep] = useState(0)
  const [isEnableNextStepBtn, setIsEnableNextStepBtn] = useState(false)
  const [onOkHandler, setOnOkHandler] = useState(() => () => {})
  const [onSuccessHandler, setOnSuccessHandler] = useState(() => () => {})
  const [onErrorHandler, setOnErrorHandler] = useState(() => () => {})

  const ServiceComponent = useMemo(
    () => serviceModalConfig?.children ?? (() => <></>),
    [serviceModalConfig]
  )

  const { mutate: sendRequest, isLoading: isSendingRequest } = useMutation({
    mutationFn: onOkHandler,
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  })

  const SERVICE_LIST = useMemo(
    () =>
      SERVICES.map((item) => (
        <Col
          span={8}
          key={item.key}
          className={item.isActive ? "" : styles.disable}
          onClick={
            item.isActive
              ? () => handleOpenServiceModal(item.modalConfig)
              : () =>
                  messageApi.warning(
                    "Dịch vụ sẽ được triển khai trong thời gian sớm nhất"
                  )
          }
        >
          <Service icon={item.icon} title={item.title} />
        </Col>
      )),
    []
  )

  const stepsOfService = useMemo(() =>
    serviceModalConfig?.steps?.map((step) => ({
      key: step,
      title: step,
    }))
  )

  const handleOpenServiceModal = useCallback(
    (modalConfig) => {
      setServiceModalConfig(modalConfig ?? {})
      setIsServiceModalOpen(true)
    },
    [setIsServiceModalOpen, setServiceModalConfig]
  )

  const handleCloseServiceModal = useCallback(() => {
    setIsServiceModalOpen(false)
  }, [setIsServiceModalOpen])

  const handleResetServiceForm = useCallback(() => {
    setIsServiceModalOpen(false)
    setCurrentStep(0)
  }, [setIsServiceModalOpen, setCurrentStep])

  useEffect(() => {
    ;(() => {
      if (serviceModalConfig?.steps) return
      setIsEnableNextStepBtn(true)
    })()
  }, [serviceModalConfig?.steps, setIsEnableNextStepBtn])

  return (
    <>
      {contextHolder}
      <Modal
        style={{ marginTop: "10vh", marginBottom: "10vh" }}
        title={<p className="fs-2_8">{serviceModalConfig?.title}</p>}
        open={isServiceModalOpen}
        cancelText={
          stepsOfService?.length && currentStep > 0 ? "Trước đó" : "Hủy bỏ"
        }
        closable={false}
        okText={
          stepsOfService?.length && stepsOfService?.length - 1 > currentStep
            ? "Tiếp theo"
            : serviceModalConfig?.okText
        }
        centered
        maskStyle={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onCancel={
          stepsOfService?.length && currentStep > 0
            ? () => setCurrentStep((prev) => prev - 1)
            : handleCloseServiceModal
        }
        okButtonProps={{
          style: { backgroundColor: isEnableNextStepBtn ? "#ff7001" : "" },
          size: "large",
          disabled: !isEnableNextStepBtn,
          href: serviceModalConfig?.isCallBtn ? "tel: 0868706226" : null,
        }}
        cancelButtonProps={{ size: "large" }}
        onOk={
          serviceModalConfig?.isCallBtn
            ? () => {}
            : stepsOfService?.length && stepsOfService?.length - 1 > currentStep
            ? () => setCurrentStep((prev) => prev + 1)
            : sendRequest
        }
        confirmLoading={isSendingRequest}
      >
        {stepsOfService?.length && (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff7001",
              },
            }}
          >
            <Steps
              current={currentStep}
              items={stepsOfService}
              style={{ minHeight: 48 }}
            />
          </ConfigProvider>
        )}
        <ServiceComponent
          currentStep={currentStep}
          setIsEnableNextStepBtn={setIsEnableNextStepBtn}
          setOnOkHandler={setOnOkHandler}
          setOnSuccessHandler={setOnSuccessHandler}
          setOnErrorHandler={setOnErrorHandler}
          handleResetServiceForm={handleResetServiceForm}
        />
      </Modal>
      <section
        id="service"
        className="p-1 container"
        style={{ paddingBottom: 0 }}
      >
        <Badge.Ribbon text="Dịch vụ" color="#4CAF50">
          <Row
            gutter={[16, 16]}
            className="linearPrimaryBg radius-8 p-1_6"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            {SERVICE_LIST}
          </Row>
        </Badge.Ribbon>
      </section>
    </>
  )
}

export default memo(Services)
