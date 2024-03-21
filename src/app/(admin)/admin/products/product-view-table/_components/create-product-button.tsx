"use client";

import { Button } from "@/components/ui/button";
import { useProductModal } from "@/hooks/use-product-modal";
import React from "react";
import { FaRegPlusSquare } from "react-icons/fa";

export default function CreateProductButton() {
  const onOpen = useProductModal((state) => state.onOpen);
  return (
    <>
      <Button onClick={() => onOpen()}>
        Create Product <FaRegPlusSquare className="ml-2" />
      </Button>
    </>
  );
}
