import { FiAlertCircle } from "react-icons/fi";

const OrderRejected = () => {
  return (
    <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
      <div className="w-20 h-20 bg-primary-light rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-3">
        <FiAlertCircle size={52} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Order Rejected</h2>
      <p className="text-center mb-8">
        I am sorry your order is rejected because your payment is not valid
      </p>
    </div>
  );
};

export default OrderRejected;
