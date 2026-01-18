import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BankInfoModal = ({ isOpen, onClose }: TBankInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account">
      <div className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Bank Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e. g. BRI, BSI, Mandiri"
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="number"
                id="accountNumber"
                name="accountNumber"
                placeholder="e. g. 121431213"
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="accountHolder">Account Holder</label>
              <input
                type="text"
                id="accountHolder"
                name="accountHolder"
                placeholder="Holder Name as registered on the account"
              />
            </div>
          </div>
        </div>

        <Button size="small" className="ml-auto mt-2 rounded-xl">
          Add Bank Account
        </Button>
      </div>
    </Modal>
  );
};

export default BankInfoModal;
