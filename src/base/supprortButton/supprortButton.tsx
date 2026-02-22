import { useState } from "react";

export default function SupportButton() {
  const [open, setOpen] = useState(false);

  // Menu items
  const menu = [
    {
      icon: "bi-telephone",
      href: "tel:+49123456789",
      label: "Call",
    },
    {
      icon: "bi-chat-dots",
      href: "/chat",
      label: "Chat",
    },
    {
      icon: "bi-question-circle",
      href: "/faq",
      label: "FAQ",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Main button */}
      <div
        className={`relative flex items-center justify-center h-14 w-14 rounded-full bg-gray-200/50 backdrop-blur-lg text-black dark:text-white shadow-2xl shadow-gray-500 cursor-pointer hover:animate-none transition-all duration-300`}
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-headset text-2xl"></i>

        {/* Menu items */}
        {open &&
          menu.map((item, index) => {
            // Calculate angle in radians
            const angle = (index * 90) / (menu.length - 1); // spread over 90 degrees
            const radius = 80; // distance from main button
            const x = radius * Math.cos(angle * (Math.PI / 180));
            const y = radius * Math.sin(angle * (Math.PI / 180));

            return (
              <a
                key={index}
                href={item.href}
                className={`absolute flex items-center justify-center w-12 h-12 bg-gray-200/50 backdrop-blur-lg text-black dark:text-white dark:bg-neutral-600 rounded-full dark:shadow-stone-50/10 shadow-lg transition-all duration-300 hover:-translate-y-1`}
                style={{
                  transform: `translate(${-x}px, ${-y}px)`,
                }}
                title={item.label}
              >
                <i className={`bi ${item.icon} text-xl`}></i>
              </a>
            );
          })}
      </div>
    </div>
  );
}
