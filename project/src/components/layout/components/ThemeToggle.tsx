"use client";


import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        position: 'absolute',
        top: '100px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute h-[1.5rem] w-[1.5rem] scale-0 transition-all dark:scale-100" />
      <span className="sr-only">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </Button>
  );
}