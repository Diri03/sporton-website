import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";

type TTransactionModalProps = {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onStatusChanged: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onStatusChanged,
}: TTransactionModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setIsUpdating(true);
    try {
      await onStatusChanged(transaction._id, status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isModalOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div className="min-w-50">
          <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>
          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="payment proof"
              width={200}
              height={401}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">No Payment Proof Uploaded</p>
            </div>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-xs mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-xs mb-5">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction.customerName}</div>
            </div>

            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction.customerContact}</div>
            </div>

            <div className="flex justify-between gap-10 font-medium">
              <div className="opacity-50 whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right">{transaction.customerAddress}</div>
            </div>
          </div>

          <h4 className="font-semibold text-xs mb-2">Items Purchased</h4>
          <div className="space-y-3">
            <div className="space-y-3">
              {transaction.purchasedItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-2 flex items-center gap-2"
                >
                  <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                    <Image
                      src={getImageUrl(item.productId.imageUrl)}
                      width={30}
                      height={30}
                      alt="product image"
                    />
                  </div>
                  <div className="font-medium text-xs">
                    {item.productId.name}
                  </div>
                  <div className="font-medium ml-auto text-xs">
                    {item.qty} units
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs mt-6">
            <h4 className="font-semibold">Total</h4>
            <div className="text-primary font-semibold">
              {priceFormatter(parseInt(transaction.totalPayment))}
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-13">
            <Button
              className="text-red-500! bg-primary/20! rounded-md"
              size="small"
              onClick={() => handleStatusUpdate("rejected")}
              disabled={isUpdating}
            >
              <FiX size={20} />
              Reject
            </Button>
            <Button
              className="text-white! bg-[#50C252]! rounded-md"
              size="small"
              onClick={() => handleStatusUpdate("paid")}
              disabled={isUpdating}
            >
              <FiCheck size={20} />
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
