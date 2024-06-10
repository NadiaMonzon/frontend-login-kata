import { useEffect, useState } from "react";
import { Button } from "../components/Button.js";
import { EmailField } from "../components/EmailField.js";
import { PasswordField } from "../components/PasswordField.js";
import { Title } from "../components/Title.js";
import { AuthService } from "../services/AuthService.ts";
import { LocalStorageService } from "../services/LocalStorageService.ts";
import { translateError } from "../utils/translateError.js";
import "./Login.css";

type LoginProps = {
  navigate: (to: string) => void;
  authService: AuthService;
  localStorageService: LocalStorageService
};

export const Login = ({ navigate, authService, localStorageService }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(null);
  }, [email, password]);

  return (
    <main className="login-container">
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          setIsLoading(true);
          setErrorMessage(null);

          authService
            .login(email, password)
            .then((payload) => {
              console.log('token', payload);

              localStorageService.setItem("token", payload);
            })
            .then(() => {
              navigate("/recipes");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        <Title>Login with email</Title>
        <p>Enter your email address to login with your account.</p>

        <EmailField
          id="email"
          labelText="Your email"
          value={email}
          onChange={setEmail}
        />
        <PasswordField
          id="password"
          labelText="Your password"
          value={password}
          onChange={setPassword}
        />
        {errorMessage && <p>{translateError(errorMessage)}</p>}
        <Button title="Login" disabled={isLoading} />
      </form>
    </main>
  );
};