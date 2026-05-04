import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";

type ConfirmDialogVariant = "danger" | "warning" | "info" | "success" | "trash";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  icon?: ReactNode; // optional manual icon
  variant?: ConfirmDialogVariant; // NEW
};

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "تایید",
  cancelText = "لغو",
  onConfirm,
  icon,
  variant = "danger", // default behavior matches common Confirm usage
}: ConfirmDialogProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleRequestClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onOpenChange(false);
    }, 200);
  };

  if (!open) return null;

  // default icons based on variant
  const variantDefaults: Record<
    ConfirmDialogVariant,
    { icon: ReactNode; color: string }
  > = {
    danger: {
      icon: <i className="bi bi-exclamation-octagon text-red-600 text-4xl" />,
      color: "text-red-600",
    },
    warning: {
      icon: (
        <i className="bi bi-exclamation-triangle text-yellow-500 text-4xl" />
      ),
      color: "text-yellow-500",
    },
    info: {
      icon: <i className="bi bi-info-circle text-blue-500 text-4xl" />,
      color: "text-blue-500",
    },
    success: {
      icon: <i className="bi bi-check-circle text-green-600 text-4xl" />,
      color: "text-green-600",
    },
    trash: {
      icon: <i className="bi bi-trash text-gray-500 text-4xl" />,
      color: "text-red-600",
    },
  };

  const chosenIcon = icon ?? variantDefaults[variant].icon; // user can override
  const confirmColor =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : variant === "warning"
        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
        : variant === "info"
          ? "bg-blue-600 hover:bg-blue-700"
          : variant === "trash"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"; // success

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={handleRequestClose}
          className={`
            fixed inset-0 bg-black/40 backdrop-blur-sm z-999
            ${isClosing ? "dialog-overlay-hide" : "dialog-overlay-show"}
          `}
        />

        <Dialog.Content
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            handleRequestClose();
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            handleRequestClose();
          }}
          className={`
            fixed left-1/2 top-1/2 w-[80%] sm:w-fit 
            -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white dark:bg-neutral-900 py-3 px-15
            shadow-xl z-1000
            ${isClosing ? "dialog-content-hide" : "dialog-content-show"}
          `}
        >
          {/* icon */}
          <div className="flex justify-center mb-3 text-4xl">{chosenIcon}</div>

          {/* title */}
          {title && (
            <Dialog.Title className="text-lg font-semibold mb-2 text-center">
              {title}
            </Dialog.Title>
          )}

          {/* description */}
          {description && (
            <Dialog.Description className="text-sm mb-4 text-gray-600 dark:text-gray-300 text-center">
              {description}
            </Dialog.Description>
          )}

          {/* actions */}
          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={handleRequestClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                onConfirm?.();
                handleRequestClose();
              }}
              className={`px-4 py-2 rounded-md text-white text-sm cursor-pointer ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
