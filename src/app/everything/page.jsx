"use client";
import React, { Suspense } from "react";
import Everything from "@/components/everything/Everything";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Everything />
    </Suspense>
  );
}
