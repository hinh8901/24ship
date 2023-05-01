import DeliveryOrderModal from "@/partials/Home/Services/partials/DeliveryOrderModal"
import MotobikeModal from "@/partials/Home/Services/partials/MotobikeModal"
import Purchases from "@/partials/Home/Services/partials/PurchasesModal"
import { Alert } from "antd"

const SERVICES = [
  {
    key: "deliveryOrder",
    icon: "/icons/box.webp",
    title: "Giao hàng",
    isActive: true,
    modalConfig: {
      title: "Giao hàng",
      okText: "Tạo đơn",
      children: (props) => <DeliveryOrderModal {...props} />,
      steps: [
        "Thông tin người gửi",
        "Thông tin người nhận",
        "Xác nhận đơn hàng",
      ],
    },
  },
  {
    key: "purchases",
    icon: "/icons/shopping-bag.webp",
    title: "Mua hàng",
    isActive: true,
    modalConfig: {
      title: "Mua hàng",
      okText: "Tạo đơn",
      children: (props) => <Purchases {...props} />,
      steps: [
        "Thông tin người đặt",
        "Thông tin đơn hàng cần mua",
        "Xác nhận đơn hàng",
      ],
    },
  },
  {
    key: "motobike",
    icon: "/icons/scooter.webp",
    title: "Xe máy",
    isActive: true,
    modalConfig: {
      title: "Đặt xe máy",
      okText: "Đặt xe",
      children: (props) => <MotobikeModal {...props} />,
      steps: ["Thông tin người đặt", "Địa điểm trả khách", "Xác nhận đơn hàng"],
    },
  },
  {
    key: "taxi",
    icon: "/icons/taxi.webp",
    title: "Taxi",
    isActive: false,
    modalConfig: {
      title: "Đặt Taxi",
      okText: "Đặt xe",
    },
  },
  {
    key: "driver",
    icon: "/icons/rental-car.webp",
    title: "Lái xe hộ",
    isActive: true,
    modalConfig: {
      title: "Dịch vụ lái xe hộ",
      okText: "Liên hệ trực tiếp",
      isCallBtn: true,
      children: () => (
        <Alert
          type="success"
          message="Để sử dụng dịch vụ nhanh chóng và thuận tiện nhất, bạn vui lòng liên hệ trực tiếp với chúng tôi."
        />
      ),
    },
  },
  {
    key: "bus",
    icon: "/icons/bus.webp",
    title: "Xe khách 16 - 29 chỗ",
    isActive: true,
    modalConfig: {
      title: "Xe khách 16 - 29 chỗ (Xe hoa, xe du lịch)",
      okText: "Liên hệ trực tiếp",
      isCallBtn: true,
      children: () => (
        <Alert
          type="success"
          message="Để sử dụng dịch vụ nhanh chóng và thuận tiện nhất, bạn vui lòng liên hệ trực tiếp với chúng tôi."
        />
      ),
    },
  },
]

export default SERVICES
