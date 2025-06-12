import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="m-6 z-50 rounded-xl bg-indigo-400 backdrop-blur-md shadow-md px-4 py-3 transition-all">
      {children}
    </header>
  );
}
