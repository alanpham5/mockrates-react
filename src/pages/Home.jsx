import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useColor } from "../api/hooks/useColor";
export function Home() {
  const navigate = useNavigate();
  const { colors } = useColor();
  return (
    <div
      style={{ padding: 30, height: "100vh", backgroundColor: colors.tertiary }}
    >
      <h1>This is the home page.</h1>
      <Button
        backgroundColor={colors.primary}
        label="Chat with Socky"
        onClick={() => {
          navigate("/chat");
        }}
      />
      <br />
      <Button
        backgroundColor={colors.secondary}
        label="Settings"
        onClick={() => {
          navigate("/settings");
        }}
      />
    </div>
  );
}
