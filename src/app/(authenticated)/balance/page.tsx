"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Balance() {
  const { push } = useRouter();

  useEffect(() => {}, []);

  return <h1>Hello word</h1>;
}
