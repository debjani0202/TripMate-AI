import {
  Maximize2,
  Minimize2,
  Send,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type PointerEvent,
} from "react";

import chatbotImage from "@/assets/images/chatbot/chatbotIcon.png";

interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
}

interface ChatSize {
  width: number;
  height: number;
}

export function TripChatbot() {
  // Controls whether the chatbot popup is open.
  const [isOpen, setIsOpen] = useState(false);

  // Current chatbot size.
  const [chatSize, setChatSize] = useState<ChatSize>({
    width: 380,
    height: 520,
  });

  // Text typed by the user.
  const [message, setMessage] = useState("");

  // Chat messages.
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi! I'm your SmartTrip AI assistant. How can I help with your trip?",
      sender: "bot",
    },
  ]);

  // Information used while dragging the resize handle.
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // ---------------------------------------------------------
  // START RESIZING
  // ---------------------------------------------------------

  const startResize = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setResizeStart({
      x: event.clientX,
      y: event.clientY,
      width: chatSize.width,
      height: chatSize.height,
    });
  };

  // ---------------------------------------------------------
  // HANDLE RESIZING
  // ---------------------------------------------------------

  useEffect(() => {
    if (!resizeStart) {
      return;
    }

    const handlePointerMove = (
      event: globalThis.PointerEvent,
    ) => {
      // Resize from the bottom-left corner.
      const newWidth =
        resizeStart.width +
        (resizeStart.x - event.clientX);

      const newHeight =
        resizeStart.height +
        (event.clientY - resizeStart.y);

      // Keep the chatbot inside a sensible size range.
      const width = Math.min(
        Math.max(newWidth, 320),
        520,
      );

      const height = Math.min(
        Math.max(newHeight, 420),
        700,
      );

      setChatSize({
        width,
        height,
      });
    };

    const handlePointerUp = () => {
      setResizeStart(null);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );
    };
  }, [resizeStart]);

  // ---------------------------------------------------------
  // MAKE CHATBOT BIGGER
  // ---------------------------------------------------------

  const increaseSize = () => {
    setChatSize((current) => ({
      width: Math.min(
        current.width + 40,
        520,
      ),
      height: Math.min(
        current.height + 40,
        700,
      ),
    }));
  };

  // ---------------------------------------------------------
  // MAKE CHATBOT SMALLER
  // ---------------------------------------------------------

  const decreaseSize = () => {
    setChatSize((current) => ({
      width: Math.max(
        current.width - 40,
        320,
      ),
      height: Math.max(
        current.height - 40,
        420,
      ),
    }));
  };

  // ---------------------------------------------------------
  // SEND MESSAGE
  // ---------------------------------------------------------

  const sendMessage = () => {
    const text = message.trim();

    if (!text) {
      return;
    }

    // Add user's message.
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        text,
        sender: "user",
      },
    ]);

    // Clear input.
    setMessage("");

    // Temporary chatbot reply.
    // Later this will connect to your backend AI chatbot.
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          text: "I'm preparing to help you with your SmartTrip itinerary.",
          sender: "bot",
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* =====================================================
          CHATBOT POPUP
          ===================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            bottom-24
            right-5
            z-50
            flex
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-orange-200/70
            bg-white/80
            shadow-[0_20px_60px_rgba(80,55,25,0.22)]
            backdrop-blur-2xl

            dark:border-orange-400/20
            dark:bg-[#1b1b1d]/90
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)]
          "
          style={{
            width: `min(${chatSize.width}px, calc(100vw - 32px))`,
            height: `min(${chatSize.height}px, calc(100vh - 120px))`,
          }}
        >
          {/* =================================================
              CHAT HEADER
              ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-orange-100/80
              bg-orange-50/45
              px-4
              py-3
              backdrop-blur-xl

              dark:border-orange-400/10
              dark:bg-orange-950/20
            "
          >
            {/* Bot information */}

            <div className="flex min-w-0 items-center gap-2.5">
              {/* Robot icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-orange-200
                  bg-orange-100/90
                  shadow-sm

                  dark:border-orange-400/20
                  dark:bg-orange-950/40
                "
              >
                <img
                  src={chatbotImage}
                  alt="SmartTrip AI chatbot"
                  className="h-9 w-9 object-contain"
                />
              </div>

              {/* Bot name */}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  SmartTrip AI
                </p>

                <p className="text-[10px] font-medium text-accent">
                  AI Travel Assistant
                </p>
              </div>
            </div>

            {/* Header buttons */}

            <div className="flex items-center gap-1">
              {/* Increase size */}

              <button
                type="button"
                onClick={increaseSize}
                title="Make chatbot bigger"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-muted-foreground
                  transition

                  hover:bg-orange-100
                  hover:text-accent

                  dark:hover:bg-orange-950/40
                "
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>

              {/* Decrease size */}

              <button
                type="button"
                onClick={decreaseSize}
                title="Make chatbot smaller"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-muted-foreground
                  transition

                  hover:bg-orange-100
                  hover:text-accent

                  dark:hover:bg-orange-950/40
                "
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>

              {/* Close chatbot */}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-muted-foreground
                  transition

                  hover:bg-orange-100
                  hover:text-accent

                  dark:hover:bg-orange-950/40
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* =================================================
              CHAT MESSAGES
              ================================================= */}

          <div
            className="
              min-h-0
              flex-1
              space-y-3
              overflow-y-auto
              bg-white/25
              p-4
              backdrop-blur-sm

              dark:bg-transparent
            "
          >
            {messages.map((chatMessage) => (
              <div
                key={chatMessage.id}
                className={`flex ${
                  chatMessage.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* Bot icon */}

                {chatMessage.sender === "bot" && (
                  <div
                    className="
                      mr-2
                      mt-1
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-orange-200/70
                      bg-orange-100/80

                      dark:border-orange-400/20
                      dark:bg-orange-950/40
                    "
                  >
                    <img
                      src={chatbotImage}
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}

                {/* Message bubble */}

                <div
                  className={`
                    max-w-[78%]
                    rounded-2xl
                    px-3
                    py-2
                    text-xs
                    leading-5
                    shadow-sm

                    ${
                      chatMessage.sender === "user"
                        ? `
                          rounded-br-md
                          bg-orange-500
                          text-white
                          shadow-orange-200/40

                          dark:bg-orange-600
                          dark:shadow-none
                        `
                        : `
                          rounded-bl-md
                          border
                          border-orange-100
                          bg-white/70
                          text-foreground
                          backdrop-blur-md

                          dark:border-orange-400/10
                          dark:bg-[#292727]/80
                        `
                    }
                  `}
                >
                  {chatMessage.text}
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              MESSAGE INPUT
              ================================================= */}

          <div
            className="
              shrink-0
              border-t
              border-orange-100/70
              bg-white/45
              p-3
              backdrop-blur-xl

              dark:border-orange-400/10
              dark:bg-[#1b1b1d]/60
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-orange-100
                bg-white/70
                p-1.5
                shadow-sm
                backdrop-blur-md

                dark:border-orange-400/15
                dark:bg-[#292727]/70
              "
            >
              {/* Text input */}

              <input
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask about your trip..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  text-xs
                  text-foreground
                  outline-none
                  placeholder:text-muted-foreground
                "
              />

              {/* Send button */}

              <button
                type="button"
                onClick={sendMessage}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-500
                  text-white
                  shadow-sm
                  transition

                  hover:bg-orange-600
                  hover:shadow-md

                  dark:bg-orange-600
                  dark:hover:bg-orange-500
                "
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* =================================================
              DRAG RESIZE HANDLE
              ================================================= */}

          <div
            onPointerDown={startResize}
            title="Drag to resize"
            className="
              absolute
              bottom-1
              left-1
              z-10
              h-6
              w-6
              cursor-sw-resize
            "
          >
            <div
              className="
                absolute
                bottom-1
                left-1
                h-3
                w-3
                border-b-2
                border-l-2
                border-orange-300

                dark:border-orange-500/60
              "
            />
          </div>
        </div>
      )}

      {/* =====================================================
          FLOATING CHATBOT BUTTON
          ===================================================== */}
          <div className="fixed bottom-5 right-6 z-[60]">
        <button
          type="button"
          onClick={() =>
            setIsOpen((current) => !current)
          }
          aria-label="Open SmartTrip AI chatbot"
          title="SmartTrip AI Assistant"
          className="
            relative
            flex
            h-[70px]
            w-[70px]
            items-center
            justify-center
            rounded-full
            border
            border-orange-200
            bg-gradient-to-br
            from-orange-50
            via-white
            to-orange-100
            p-1.5
            shadow-[0_10px_30px_rgba(220,130,40,0.28)]
            transition
            duration-200

            hover:-translate-y-1
            hover:scale-105
            hover:shadow-[0_14px_35px_rgba(220,130,40,0.38)]

            dark:border-orange-400/25
            dark:from-orange-950/70
            dark:via-[#292727]
            dark:to-orange-900/40
          "
        >
          {/* Robot image */}

          <img
            src={chatbotImage}
            alt="SmartTrip AI chatbot"
            className="
              h-full
              w-full
              object-contain
              drop-shadow-md
            "
          />

          {/* Online indicator */}

          <span
            className="
              absolute
              bottom-1
              right-1
              h-3
              w-3
              rounded-full
              border-2
              border-white
              bg-green-500
              shadow-sm

              dark:border-[#292727]
            "
          />
        </button>
      </div>
    </>
  );
}

// Export it as default too.
// This also makes the component safe to import either way.
export default TripChatbot;