import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface ButtonProps {
  variant: "forMonth" | "send" | "buttonMenu";
  onClick: VoidFunction;
  className?: string;
  disabled?: boolean; // Добавляем свойство disabled
}

const variants = {
  forMonth:
    "bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl",
  send: "mt-4 bg-green-500 text-white rounded p-2 transition duration-300 ease-in-out hover:bg-green-600 w-full outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  buttonMenu: "bg-blue-500 text-white rounded-xl p-3 w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl"
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant,
  className,
  onClick,
  disabled, 
  children,
}) => {
  return (
    <button
      className={clsx(
        className,
        variant === "forMonth" && variants.forMonth,
        variant === "send" && variants.send,
        variant === "buttonMenu" && variants.buttonMenu
      )}
      onClick={onClick}
      disabled={disabled} 
    >
      {children}
    </button>
  );
};
