import { Plus } from "lucide-react";

import PixelGrid from "@/components/PixelGrid";
import FolderStack from "@/components/FolderStack";
import TypewriterPrompt from "@/components/TypewriterPrompt";
import SendButton from "@/components/SendButton";
import { motion } from "framer-motion";

const A = "https://qclay.design/lovable/sixsense";
const INTER_TIGHT = "'Inter Tight', sans-serif";

export default function Index() {
  return (
    <div
      style={{
        background: "#EEF1F7",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <PixelGrid side="left" />
      <PixelGrid side="right" />

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div
          style={{
            marginTop: 22,
            marginLeft: 22,
            display: "flex",
            alignItems: "center",
            gap: 6,
            width: 86.816,
            height: 16,
          }}
        >
          <img src={`${A}/logo-icon.svg`} alt="" style={{ height: 16, width: "auto" }} />
          <img src={`${A}/logo-text.svg`} alt="Sixsense" style={{ height: 16, width: "auto" }} />
        </div>
      </header>

      <div
        style={{
          position: "fixed",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          type="button"
          aria-label="Chat"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            border: "1px solid rgba(34,106,205,0.05)",
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.90)")}
        >
          <img src={`${A}/chat.svg`} alt="" style={{ width: 18, height: 18 }} />
        </button>
        <button
          type="button"
          aria-label="Search"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            border: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <img src={`${A}/search.svg`} alt="" style={{ width: 18, height: 18 }} />
        </button>
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 60,
          maxWidth: 760,
          width: "100%",
        }}
      >
        <FolderStack />

        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: INTER_TIGHT,
            fontSize: 32,
            fontWeight: 400,
            lineHeight: "32px",
            letterSpacing: "-0.64px",
            color: "#11315D",
            width: 385,
            maxWidth: "100%",
            margin: "32px auto 8px",
            textAlign: "center",
          }}
        >
          Let&apos;s find the right
          <br />
          references for your work
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          style={{
            fontFamily: INTER_TIGHT,
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(13,27,75,0.50)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          What type of references are you looking for?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          style={{
            width: 702,
            maxWidth: "100%",
            margin: "0 auto",
            padding: 4,
            borderRadius: 24,
            border: "0.5px solid rgba(0,0,0,0.05)",
            background: "rgba(157,196,250,0.15)",
            backdropFilter: "blur(50px)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 116,
              background: "#fff",
              borderRadius: 20,
              border: "1px solid rgba(34,106,205,0.05)",
              padding: "14px 14px 12px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TypewriterPrompt />

            <div
              style={{
                marginTop: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, transform: "translateY(35%)" }}>
                <div
                  style={{
                    width: 110,
                    height: 28,
                    background: "#E8F1FF",
                    borderRadius: 8,
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 4,
                      background: "linear-gradient(166deg, #A0E4FF 9.8%, #9CA4FB 184.41%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img src={`${A}/ai-select.svg`} alt="" style={{ width: 8, height: 8 }} />
                  </div>
                  <span
                    style={{
                      fontFamily: INTER_TIGHT,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: "#5085CE",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Top Expert
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Image"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.10)",
                    background: "rgba(255,255,255,0.80)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={`${A}/image.svg`} alt="" style={{ width: 14, height: 14 }} />
                </button>
                <button
                  type="button"
                  aria-label="Capa"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.10)",
                    background: "rgba(255,255,255,0.80)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={`${A}/Capa_1.svg`} alt="" style={{ width: 14, height: 14 }} />
                </button>

                <div style={{ width: 1, height: 18, background: "rgba(0,0,0,0.12)", margin: "0 2px" }} />

                <button
                  type="button"
                  aria-label="Add"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.10)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(0,0,0,0.40)",
                  }}
                >
                  <Plus size={16} />
                </button>

                <div
                  style={{
                    height: 28,
                    background: "rgba(0,0,0,0.05)",
                    borderRadius: 6,
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontFamily: INTER_TIGHT, fontSize: 12, color: "rgba(13,27,75,0.65)" }}>
                    UI Design
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", marginLeft: 2 }}>×</span>
                </div>
              </div>

              <SendButton />
            </div>
          </div>
        </motion.div>
      </main>

      <footer
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 5,
          textAlign: "center",
          fontFamily: INTER_TIGHT,
          fontSize: 13,
          fontWeight: 400,
          color: "rgba(13,27,75,0.45)",
        }}
      >
        By sending a message to ChatBot, you agree to our{" "}
        <a
          href="#"
          style={{ color: "rgba(13,27,75,0.65)", textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}
        >
          Terms
        </a>{" "}
        and have read our{" "}
        <a
          href="#"
          style={{ color: "rgba(13,27,75,0.65)", textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}
        >
          Privacy Policy.
        </a>
      </footer>
    </div>
  );
}
