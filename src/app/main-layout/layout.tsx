/* eslint-disable @typescript-eslint/no-unused-vars */
// app/MobileWrapper.tsx

"use client";

import { COLOR } from "@/lib/color-palet";
import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export function MobileWrapper({ children }: { children: React.ReactNode }) {
  const { width } = useViewportSize();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100dvh",
        position: "relative", // Penting agar footer bisa relative terhadap wrapper
        backgroundColor: COLOR.white,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
          // border: "0.5px solid #dee2e6",
          position: "relative", // Agar child fixed-position tidak keluar dari konteks ini
        }}
      >
        {/* Header */}
        <header
          style={{
            height: 60,
            padding: "0 16px",  
            backgroundColor: COLOR.dark_green,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            flexShrink: 0,
            top: 0,
            zIndex: 10,
            borderRadius: "0px 0px 10px 10px",
            borderBottom: `1px solid ${COLOR.cream}`,
          }}
        >
          Header Mobile
        </header>

        {/* Konten Utama - Scrollable */}
        <main
          style={{
            paddingInline: "16px",
            paddingTop: "16px",
            paddingBottom: 60, // Memberi ruang untuk footer fixed
            flex: 1,
            overflowY: "auto",
            backgroundColor: COLOR.white,
          }}
        >
          {children}
        </main>

        {/* Footer - Fixed Bottom (tetap di bawah layar) */}
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 480,
            height: 60,
            padding: "8px 16px",
            backgroundColor: COLOR.dark_green,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 10,
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px 10px 0 0",
            color: COLOR.cream,
          }}
        >
          <Button variant="subtle" color={COLOR.cream}>
            Home
          </Button>
          <Button variant="subtle" color={COLOR.cream}>
            Wishlist
          </Button>
          <Button variant="subtle" color={COLOR.cream}>
            Cart
          </Button>
          <Button variant="subtle" color={COLOR.cream}>
            Account
          </Button>
        </footer>
      </div>
    </div>
  );
}
