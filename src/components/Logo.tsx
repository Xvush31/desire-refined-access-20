
import React from "react";
import { useTheme } from "@/hooks/use-theme";

const Logo = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-centre">
      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} text-left mx-0 text-3xl`}>
        X<span className="animated-gradient font-bold text-3xl">v</span>ush
      </span>
    </div>
  );
};

export default Logo;
