import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative h-10 w-10 rounded-xl border-border/50 bg-card/80 backdrop-blur-sm"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-10 rounded-xl border-border/50 bg-card/80 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all duration-300 group"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 group-hover:text-primary dark:-rotate-90 dark:scale-0 text-warning" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 group-hover:text-primary dark:rotate-0 dark:scale-100 text-primary" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
