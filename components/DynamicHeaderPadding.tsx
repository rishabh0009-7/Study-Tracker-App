"use client";

import { useEffect } from "react";

export function DynamicHeaderPadding() {
  useEffect(() => {
    const adjustHeaderPadding = () => {
      const header = document.getElementById("dynamic-header");
      const mainContent = document.getElementById("main-content");

      if (header && mainContent) {
        // Get the actual height of the header
        const headerHeight = header.offsetHeight;
        const headerRect = header.getBoundingClientRect();
        const actualHeight = headerRect.height;

        // Use the larger of the two measurements and add generous padding
        const maxHeight = Math.max(headerHeight, actualHeight);
        const additionalPadding = 32; // 32px extra padding for breathing room
        const totalPadding = maxHeight + additionalPadding;

        // Apply the calculated padding with !important to override any existing styles
        mainContent.style.setProperty(
          "padding-top",
          `${totalPadding}px`,
          "important"
        );

        console.log(
          "Header height:",
          maxHeight,
          "Total padding:",
          totalPadding
        );
      }
    };

    // Use multiple strategies to ensure it works
    const runAdjustment = () => {
      // Immediate adjustment
      adjustHeaderPadding();

      // Delayed adjustments to catch any layout changes
      setTimeout(adjustHeaderPadding, 100);
      setTimeout(adjustHeaderPadding, 300);
      setTimeout(adjustHeaderPadding, 500);
    };

    // Run adjustment on mount
    runAdjustment();

    // Adjust padding on window resize
    window.addEventListener("resize", runAdjustment);

    // Adjust padding when fonts load
    document.fonts.ready.then(runAdjustment);

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(runAdjustment);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", runAdjustment);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
