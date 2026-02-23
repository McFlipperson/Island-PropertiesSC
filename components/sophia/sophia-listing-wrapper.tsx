"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/use-ui-store";

type YunaListingWrapperProps = {
  propertyContext: string;
};

/**
 * Sets the property context in the UI store so Yuna
 * knows about the current listing. Cleans up on unmount.
 */
export function YunaListingWrapper({ propertyContext }: YunaListingWrapperProps) {
  const setYunaPropertyContext = useUIStore((state) => state.setYunaPropertyContext);

  useEffect(() => {
    setYunaPropertyContext(propertyContext);
    return () => setYunaPropertyContext(null);
  }, [propertyContext, setYunaPropertyContext]);

  return null;
}
