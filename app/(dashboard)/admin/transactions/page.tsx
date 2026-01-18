"use client";
import { useState } from "react";
import TransactionModal from "../../components/transactions/transaction-modal";
import TransactionTable from "../../components/transactions/transaction-table";

const TransactionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleViewDetails = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transactions</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable onViewDetails={handleViewDetails} />
      <TransactionModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default TransactionManagement;
