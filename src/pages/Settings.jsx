export function Settings() {
  const colors = {
    primary: "#81968F",
    secondary: "#96BDC6",
    tertiary: "#FFF5F5",
  };
  return (
    <div
      style={{ padding: 30, minHeight: 1080, backgroundColor: colors.tertiary }}
    >
      <h1>This is the settings page.</h1>
    </div>
  );
}
