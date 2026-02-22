"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/use-ui-store";

type SophiaListingWrapperProps = {
  propertyContext: string;
};

/**
 * Sets the property context in the UI store so Sophia
 * knows about the current listing. Cleans up on unmount.
 */
export function SophiaListingWrapper({ propertyContext }: SophiaListingWrapperProps) {
  const setSophiaPropertyContext = useUIStore((state) => state.setSophiaPropertyContext);

  useEffect(() => {
    setSophiaPropertyContext(propertyContext);
    return () => setSophiaPropertyContext(null);
  }, [propertyContext, setSophiaPropertyContext]);

  return null;
}
