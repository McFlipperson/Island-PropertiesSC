"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/use-ui-store";

type SaraListingWrapperProps = {
  propertyContext: string;
};

/**
 * Sets the property context in the UI store so Sophia
 * knows about the current listing. Cleans up on unmount.
 */
export function SaraListingWrapper({ propertyContext }: SaraListingWrapperProps) {
  const setSaraPropertyContext = useUIStore((state) => state.setSaraPropertyContext);

  useEffect(() => {
    setSaraPropertyContext(propertyContext);
    return () => setSaraPropertyContext(null);
  }, [propertyContext, setSaraPropertyContext]);

  return null;
}
