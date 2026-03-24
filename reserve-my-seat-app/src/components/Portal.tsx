import { type ReactNode, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  // Select the target element
  const mount = document.getElementById("portal-root");

  // Create a div to wrap our portal content
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (mount) {
      mount.appendChild(el);
      return () => {
        mount.removeChild(el);
      };
    }
  }, [el, mount]);

  // If mount point doesn't exist, return null to prevent crashing
  if (!mount) return null;

  return createPortal(children, el);
};

export default Portal;
