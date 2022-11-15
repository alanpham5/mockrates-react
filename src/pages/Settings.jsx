import { useColor } from "../api/hooks/useColor";
import { ColorPalette } from "../components/ColorPalette";
import { Button } from "../components/Button";

export function Settings() {
  const { colors, setColors } = useColor();
  const defaultTheme = {
    primary: "#81968F",
    secondary: "#96BDC6",
    tertiary: "#FFF5F5",
  };

  const purpleTheme = {
    primary: "#868FBC",
    secondary: "#A87FA9",
    tertiary: "#E9D6EC",
  };

  const peachTheme = {
    primary: "#DC8F84",
    secondary: "#E4A0B0",
    tertiary: "#E8CCBF",
  };

  const tealTheme = {
    primary: "#5AB9B9",
    secondary: "#7DCFCA",
    tertiary: "#C1EBE6",
  };

  const christmasTheme = {
    primary: "#709478",
    secondary: "#C56761",
    tertiary: "#FCFFE8",
  };

  const themes = [
    defaultTheme,
    purpleTheme,
    peachTheme,
    tealTheme,
    christmasTheme,
  ];

  return (
    <div
      style={{ padding: 30, height: "100vh", backgroundColor: colors.tertiary }}
    >
      <h1>This is the settings page.</h1>
      {themes.map((theme) => {
        return (
          <div
            style={{
              flexShrink: 10,
              display: "flex",
              margin: "2%",
              alignItems: "center",
            }}
          >
            <ColorPalette
              primary={theme.primary}
              secondary={theme.secondary}
              tertiary={theme.tertiary}
            />
            <Button
              label="Select Theme"
              backgroundColor={colors.primary}
              onClick={() => {
                setColors(theme);
              }}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
}
