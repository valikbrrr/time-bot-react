import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: VoidFunction;
  className?: string;
}

const variants = {
  primary:
    "bg-blue-500 text-white rounded-xl p-3 w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl",
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant,
  className,
  children,
}) => {
  return (
    <button
      className={clsx(className, variant === "primary" && variants.primary)}
    >
      {children}
    </button>
  );
};
