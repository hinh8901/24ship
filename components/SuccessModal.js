import { Button, ConfigProvider, Modal, Result } from "antd"

const SuccessModal = ({ isOpen, setIsOpen, title, subTitle }) => {
  return (
    <Modal open={isOpen} closable={false} footer={null} centered>
      <Result
        status="success"
        title={title}
        subTitle={subTitle}
        extra={
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
              size="large"
              className="primaryBg ml-1_6 mr-1_6 p-hoz-2 fw-500"
              onClick={() => setIsOpen(false)}
            >
              Quay lại màn hình chính
            </Button>
          </ConfigProvider>
        }
      />
    </Modal>
  )
}

export default SuccessModal
