"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GhostEmployeeHUDProps {
  open: boolean;
  onClose: () => void;
}

export default function GhostEmployeeHUD({ open, onClose }: GhostEmployeeHUDProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [latency, setLatency] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [openingRevealed, setOpeningRevealed] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session
  useEffect(() => {
    if (open && !sessionId) {
      const id = "NOVA-" + Math.random().toString(16).slice(2, 8).toUpperCase();
      setSessionId(id);
      setMessages([
        {
          role: "assistant",
          content: "Hi — I'm Nova. In the next 5 minutes I'll map where your business is leaking time and money, and tell you exactly which ghost employees to deploy first. What do you do? (one sentence is fine)",
        },
      ]);
      setMessageCount(0);
      setShowCTA(false);
      setOpeningRevealed(false);
    }
  }, [open, sessionId]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + "px";
    }
  }, [input]);

  // Post session to lead endpoint (fire-and-forget)
  const postLeadCapture = useCallback(
    async (
      sessionMessages: Message[],
      email?: string,
      booked?: boolean
    ) => {
      try {
        await fetch("/api/agent/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            email: email || undefined,
            messages: sessionMessages,
            booked: booked || false,
          }),
        });
      } catch (error) {
        console.error("[Nova] Lead capture failed:", error);
        // Don't block user flow if lead endpoint is down
      }
    },
    [sessionId]
  );

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const newMessageCount = messageCount + 1;
    setMessageCount(newMessageCount);

    // Post "conversation started" ping on first user message (pre-stream)
    if (newMessageCount === 1) {
      postLeadCapture(newMessages, "");
    }

    // Check if we should show CTA after this exchange
    if (newMessageCount >= 5) {
      setShowCTA(true);
    }

    try {
      const startTime = performance.now();

      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      const readChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          const endTime = performance.now();
          setLatency(Math.round(endTime - startTime));

          // Check for READY_TO_BOOK token
          if (fullResponse.includes("[READY_TO_BOOK]")) {
            setShowCTA(true);
            fullResponse = fullResponse.replace("[READY_TO_BOOK]", "").trim();
          }

          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        // Add message character by character for typewriter effect
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { ...lastMsg, content: lastMsg.content + chunk },
            ];
          }
          return [...prev, { role: "assistant", content: chunk }];
        });

        await readChunk();
      };

      // Start with empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      await readChunk();
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `[ERROR] Failed to get response. ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, messageCount, postLeadCapture]);

  // Handle email submission
  const handleEmailSubmit = useCallback(async () => {
    if (!emailValue.trim() || emailSubmitting) return;

    setEmailError(null);
    setEmailSubmitting(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      setEmailSubmitting(false);
      return;
    }

    // Post to lead endpoint
    await postLeadCapture(messages, emailValue, false);

    setEmailCaptured(true);
    setEmailSubmitting(false);
  }, [emailValue, emailSubmitting, postLeadCapture, messages]);

  // Handle Calendly click (booked=true)
  const handleCalendlyClick = useCallback(() => {
    // Fire-and-forget POST to mark as booked
    postLeadCapture(messages, emailValue, true);
  }, [postLeadCapture, messages, emailValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9998,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "90vh",
              maxHeight: "700px",
              backgroundColor: "rgba(10,14,26,0.95)",
              borderRadius: "12px",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              flexDirection: "column",
              zIndex: 9999,
              backdropFilter: "blur(8px)",
              margin: "auto",
              marginBottom: "2rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid rgba(59,130,246,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  color: "rgba(100,140,200,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                // AGENT_01 : DIAGNOSTIC_SCOUT
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Agent Persona Card */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid rgba(59,130,246,0.1)",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(59,130,246,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "18px",
                  color: "rgba(59,130,246,0.8)",
                  flexShrink: 0,
                }}
              >
                01
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    marginBottom: "0.25rem",
                  }}
                >
                  NOVA
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Ghost Employee — Business Diagnostics
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "11px",
                    color: "#00ff88",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#00ff88",
                    }}
                  />
                  ONLINE
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "assistant" ? (
                    <TypewriterMessage
                      content={msg.content}
                      isFirst={idx === 0}
                      onReveal={idx === 0 ? () => setOpeningRevealed(true) : undefined}
                    />
                  ) : (
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "rgba(59,130,246,0.2)",
                        color: "#ffffff",
                        borderRadius: "8px",
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(10,14,26,0.4)",
                    borderRadius: "8px",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(59,130,246,0.6)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input Area or CTA */}
            {!showCTA ? (
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid rgba(59,130,246,0.1)",
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your response..."
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(59,130,246,0.05)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    resize: "none",
                    minHeight: "44px",
                    maxHeight: "120px",
                    overflow: "auto",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: !input.trim() || loading ? "rgba(255,255,255,0.2)" : "#ffffff",
                    color: !input.trim() || loading ? "rgba(0,0,0,0.4)" : "#000000",
                    border: "none",
                    borderRadius: "6px",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!(!input.trim() || loading)) {
                      (e.target as HTMLButtonElement).style.backgroundColor = "#ffffff";
                      (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(!input.trim() || loading)) {
                      (e.target as HTMLButtonElement).style.backgroundColor = "#ffffff";
                      (e.target as HTMLButtonElement).style.transform = "scale(1)";
                    }
                  }}
                >
                  SEND →
                </button>
              </div>
            ) : !emailCaptured ? (
              // Email gate
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid rgba(59,130,246,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ready to book? Drop your email to continue.
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !emailSubmitting) {
                        handleEmailSubmit();
                      }
                    }}
                    placeholder="your@email.com"
                    disabled={emailSubmitting}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(59,130,246,0.05)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      borderRadius: "6px",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(59,130,246,0.4)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(59,130,246,0.2)";
                    }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!emailValue.trim() || emailSubmitting}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: !emailValue.trim() || emailSubmitting ? "rgba(255,255,255,0.2)" : "#ffffff",
                      color: !emailValue.trim() || emailSubmitting ? "rgba(0,0,0,0.4)" : "#000000",
                      border: "none",
                      borderRadius: "6px",
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: !emailValue.trim() || emailSubmitting ? "not-allowed" : "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!(!emailValue.trim() || emailSubmitting)) {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#ffffff";
                        (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(!emailValue.trim() || emailSubmitting)) {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#ffffff";
                        (e.target as HTMLButtonElement).style.transform = "scale(1)";
                      }
                    }}
                  >
                    {emailSubmitting ? "..." : "Reveal →"}
                  </button>
                </div>
                {emailError && (
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "12px",
                      color: "#ff6b6b",
                    }}
                  >
                    {emailError}
                  </div>
                )}
              </div>
            ) : (
              // Calendly CTA (after email captured)
              <div
                style={{
                  padding: "2rem",
                  borderTop: "1px solid rgba(59,130,246,0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Let's finish this face to face.
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Book a 30-min strategy call. Free. No pressure.
                </div>
                <a
                  href="https://calendly.com/neonbeachclub/strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCalendlyClick}
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.transform = "scale(1)";
                  }}
                >
                  → Book Strategy Call
                </a>
              </div>
            )}

            {/* Footer */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid rgba(59,130,246,0.1)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                color: "rgba(100,140,200,0.4)",
                textAlign: "center",
              }}
            >
              // SESSION_ID: {sessionId} — LATENCY: {latency}ms
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypewriterMessage({
  content,
  isFirst,
  onReveal,
}: {
  content: string;
  isFirst: boolean;
  onReveal?: () => void;
}) {
  const [displayedContent, setDisplayedContent] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isFirst || displayedContent.length > 0) {
      // Only run typewriter for first message on initial render
      return;
    }

    indexRef.current = 0;
    setDisplayedContent("");

    const interval = setInterval(() => {
      if (indexRef.current < content.length) {
        setDisplayedContent(content.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onReveal?.();
      }
    }, 18);

    return () => clearInterval(interval);
  }, [isFirst, content, onReveal]);

  const finalContent = isFirst && displayedContent.length > 0 ? displayedContent : content;

  return (
    <div
      style={{
        maxWidth: "80%",
        padding: "1rem",
        backgroundColor: "rgba(10,14,26,0.4)",
        borderLeft: "2px solid rgba(59,130,246,0.5)",
        color: "#ffffff",
        borderRadius: "8px",
        fontFamily: "var(--font-inter)",
        fontSize: "14px",
        lineHeight: 1.6,
      }}
    >
      {finalContent}
    </div>
  );
}
