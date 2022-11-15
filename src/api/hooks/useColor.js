import { useEffect, useState } from "react";

export function useColor() {
  const defaultColor = {
    primary: "#81968F",
    secondary: "#96BDC6",
    tertiary: "#FFF5F5",
  };

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme") ?? defaultColor)
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return { colors: theme, setColors: setTheme };
}
