import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button.js";
import { EmailField } from "../components/EmailField.js";
import { PasswordField } from "../components/PasswordField.js";
import { Title } from "../components/Title.js";
import { LoginUseCase } from "../services/LoginUseCase.ts";
import { translateError } from "../utils/translateError.ts";
import "./Login.css";
import { ErrorBoundary } from "@sentry/react";

type LoginProps = {
  loginUseCase: LoginUseCase;
};
export const useAsyncError = () => {
  const [, setError] = useState();
  const useCallback1 = useCallback(
    (e: unknown) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
  return { propagateError: useCallback1 };
};
export const Login = ({ loginUseCase }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {propagateError} = useAsyncError()
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

          loginUseCase
            .login(email, password)
            .catch((error) => {
              if(error.message != null && error.message == 'wrong_email_or_password'){
                console.log(error)
                setErrorMessage(error.message)
                return
              }
              throw new Error(error)
            }).catch(propagateError)
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