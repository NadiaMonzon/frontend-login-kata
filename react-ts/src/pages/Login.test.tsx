import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import { AuthService } from "../services/AuthService.ts";
import { LocalStorageService } from "../services/LocalStorageService.ts";
import { Login } from "./Login.tsx";

describe("Login", () => {

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("redirects to recipe page after login", async () => {
    const user = userEvent.setup();
    const navigateSpy = vi.fn();
    const authServiceFake: AuthService = {
      login: async () => "token",
    };
    const localStorageServiceFake: LocalStorageService = {
      setItem: vi.fn()
    }
    render(<Login navigate={navigateSpy} authService={authServiceFake} localStorageService={localStorageServiceFake} />);

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com",
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalledWith("/recipes");
    });
  });

  it('should set token on local storage', async () => {
    const user = userEvent.setup();
    const navigateSpy = vi.fn();
    const authServiceFake: AuthService = {
      login: async () => "token",
    };
    let tokenDummy: string;
    const localStorageServiceFake: LocalStorageService = {
      setItem: vi.fn(),
    }
    await render(<Login navigate={navigateSpy} authService={authServiceFake} localStorageService={localStorageServiceFake} />)

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com",
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(localStorageServiceFake.setItem).toHaveBeenCalledWith('token', 'token')

    })

  })
});