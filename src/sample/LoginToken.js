import { useState } from "react";
import axios from "axios";

function LoginToken() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // 로그인 요청을 보내고 응답을 받습니다.
      const response = await axios.post("/api/login", { username, password });

      // 응답에서 토큰을 추출합니다.
      const token = response.data.token;

      // 추출한 토큰을 저장합니다. (브라우저 환경에서는 자동으로 저장됩니다.)
      localStorage.setItem("token", token);

      // 로그인 성공 메시지를 출력합니다.
      console.log("로그인에 성공했습니다.");
    } catch (error) {
      // 로그인 실패 메시지를 출력합니다.
      console.error("로그인에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginToken;
