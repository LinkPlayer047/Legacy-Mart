"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchParamsWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return React.cloneElement(children, { category });
};

export default SearchParamsWrapper;
