import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
export function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: 20 }}>
      <h1>This is the home page.</h1>
      <Button
        backgroundColor={"#81968F"}
        label="Chat with Socky"
        onClick={() => {
          navigate("/chat");
        }}
      />
      <br />
      <Button
        backgroundColor={"#81968F"}
        label="Settings"
        onClick={() => {
          navigate("/settings");
        }}
      />
    </div>
  );
}
