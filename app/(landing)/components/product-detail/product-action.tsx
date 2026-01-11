"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductActions = () => {
  const { push } = useRouter();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex gap-5">
      <div className="flex items-center border border-gray-500 h-20">
        <div className="w-16 h-full flex items-center justify-center text-lg font-medium border-r border-gray-500">
          {qty}
        </div>
        <div className="flex flex-col h-full w-10">
          <button
            className="flex-1 flex items-center cursor-pointer justify-center border-b border-gray-500"
            onClick={() => setQty(qty + 1)}
          >
            <FiChevronUp />
          </button>
          <button
            className="flex-1 flex items-center cursor-pointer justify-center"
            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>

      <Button className="px-20 w-full">
        <FiShoppingBag size={24} />
        Add to chart
      </Button>
      <Button
        variant="dark"
        className="px-20 w-full"
        onClick={() => push("/checkout")}
      >
        Checkout Now
        <FiArrowRight size={24} />
      </Button>
    </div>
  );
};

export default ProductActions;
