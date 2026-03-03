import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #6F6C43 0%, #ACB090 50%, #99ABA6 100%)",
        padding: "20px",
      }}
    >
      {/* Scale the whole phone down to fit the viewport */}
      <div style={{
        transform: "scale(0.75)",
        transformOrigin: "center center",
        flexShrink: 0,
      }}>
        <div className="relative" style={{ width: "393px", height: "852px" }}>

          {/* ── LEFT BUTTONS ── */}
          {/* Mute */}
          <div style={{
            position: "absolute", left: "-11px", top: "154px",
            width: "8px", height: "30px",
            background: "linear-gradient(to right, #b0b0b0, #e8e8e8, #b8b8b8)",
            borderRadius: "4px 0 0 4px",
            boxShadow: "-2px 0 4px rgba(0,0,0,0.25)",
          }} />
          {/* Volume up */}
          <div style={{
            position: "absolute", left: "-11px", top: "210px",
            width: "8px", height: "56px",
            background: "linear-gradient(to right, #b0b0b0, #e8e8e8, #b8b8b8)",
            borderRadius: "4px 0 0 4px",
            boxShadow: "-2px 0 4px rgba(0,0,0,0.25)",
          }} />
          {/* Volume down */}
          <div style={{
            position: "absolute", left: "-11px", top: "282px",
            width: "8px", height: "56px",
            background: "linear-gradient(to right, #b0b0b0, #e8e8e8, #b8b8b8)",
            borderRadius: "4px 0 0 4px",
            boxShadow: "-2px 0 4px rgba(0,0,0,0.25)",
          }} />

          {/* ── RIGHT BUTTON ── */}
          <div style={{
            position: "absolute", right: "-11px", top: "248px",
            width: "8px", height: "80px",
            background: "linear-gradient(to left, #b0b0b0, #e8e8e8, #b8b8b8)",
            borderRadius: "0 4px 4px 0",
            boxShadow: "2px 0 4px rgba(0,0,0,0.25)",
          }} />

          {/* ── PHONE BODY (silver) ── */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "52px",
            background: "linear-gradient(145deg, #f8f8f8 0%, #e8e8e8 50%, #d4d4d4 100%)",
            boxShadow: `
              0 0 0 1.5px #c0c0c0,
              0 0 0 3px rgba(255,255,255,0.7),
              0 30px 70px rgba(0,0,0,0.35),
              inset 0 1px 0 rgba(255,255,255,1),
              inset 0 -1px 0 rgba(0,0,0,0.06)
            `,
            padding: "12px",
          }}>

            {/* Black bezel ring */}
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "42px",
              backgroundColor: "#000",
              padding: "3px",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}>

              {/* Screen */}
              <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "40px",
                overflow: "hidden",
                backgroundColor: "#000",
              }}>

                {/* Screen glare */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "180px",
                  borderRadius: "40px 40px 0 0",
                  background: "linear-gradient(150deg, rgba(255,255,255,0.07) 0%, transparent 55%)",
                  zIndex: 20, pointerEvents: "none",
                }} />

                {/* Dynamic Island */}
                <div style={{
                  position: "absolute", top: "14px", left: "50%",
                  transform: "translateX(-50%)",
                  width: "116px", height: "34px",
                  backgroundColor: "#000", borderRadius: "18px",
                  zIndex: 30, display: "flex", alignItems: "center",
                  justifyContent: "flex-end", paddingRight: "18px",
                  boxShadow: "0 0 0 1px rgba(40,40,40,0.8)",
                }}>
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "50%",
                    backgroundColor: "#0a0a0a", border: "1.5px solid #1c1c1c",
                    boxShadow: "inset 0 0 4px rgba(0,0,0,1), 0 0 6px rgba(80,160,255,0.12)",
                  }} />
                </div>

                {/* Status bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "59px",
                  zIndex: 25, display: "flex", alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingLeft: "28px", paddingRight: "28px", paddingBottom: "8px",
                  pointerEvents: "none",
                }}>
                  <span style={{
                    color: "#1a1a1a", fontSize: "15px", fontWeight: "600",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    letterSpacing: "-0.3px",
                  }}>9:41</span>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {/* Signal */}
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <rect x="0" y="7" width="3" height="5" rx="1" fill="#1a1a1a" />
                      <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#1a1a1a" />
                      <rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a" />
                      <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" />
                    </svg>
                    {/* Wifi */}
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <circle cx="8" cy="11" r="1.5" fill="#1a1a1a"/>
                      <path d="M4.5 7.5C5.6 6.4 7.2 5.8 8 5.8s2.4.6 3.5 1.7" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      <path d="M2 5C3.8 3.2 5.8 2.2 8 2.2s4.2 1 6 2.8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
                    </svg>
                    {/* Battery */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{
                        width: "25px", height: "12px",
                        border: "1.5px solid #1a1a1a", borderRadius: "3px", padding: "1.5px",
                      }}>
                        <div style={{ width: "80%", height: "100%", backgroundColor: "#1a1a1a", borderRadius: "1px" }} />
                      </div>
                      <div style={{ width: "2px", height: "5px", backgroundColor: "#1a1a1a", borderRadius: "0 1px 1px 0", opacity: 0.5, marginLeft: "1px" }} />
                    </div>
                  </div>
                </div>

                {/* App content */}
                <div style={{
                  width: "100%", height: "100%",
                  overflowY: "auto", overflowX: "hidden",
                  backgroundColor: "#F0EAD8",
                  paddingTop: "59px", paddingBottom: "34px",
                }}>
                  {children}
                </div>

                {/* Home indicator */}
                <div style={{
                  position: "absolute", bottom: "10px", left: "50%",
                  transform: "translateX(-50%)",
                  width: "130px", height: "5px",
                  backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "3px",
                  zIndex: 30, pointerEvents: "none",
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
