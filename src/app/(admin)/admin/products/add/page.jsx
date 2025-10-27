"use client";
import { Suspense } from "react";
import AddProduct from "./AddProduct";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProduct />
    </Suspense>
  );
}
