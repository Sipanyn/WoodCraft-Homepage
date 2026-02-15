import type React from "react";
type AiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const AiButton: React.FC<React.FC<AiButtonProps>> = ({ ...props }) => {
  return (
    <button
      {...props}
      className="
        fixed right-5 bottom-3 z-50
        animate-bounce
    flex items-center gap-2
    bg-stone-200/50 dark:bg-neutral-700/50
    backdrop-blur-xl
    text-black dark:text-white
    p-2 sm:px-3 sm:py-2
    rounded-full
    shadow-lg
    hover:bg-wood hover:dark:bg-wood/90
    transition-all duration-300
    hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-wood/60
    cursor-pointer"
    >
      <p className="hidden sm:block">Start creating by</p>
      <i className="bi bi-robot text-2xl flex justify-center items-center"></i>
    </button>
  );
};

export default AiButton;
