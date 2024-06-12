import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthService } from "./AuthService";
import { LoginUseCase } from "./LoginUseCase";
import { RouterServiceReactRouter } from "./RouterServiceReactRouter";
import { TokenRepository } from "./TokenRepository";
import { TokenRepositoryLocalStorage } from "./TokenRepositoryLocalStorage";

describe('LoginUseCase', () => {
    const email = "linustorvalds@gmail.com";
    const password = "ilovecats";
    const token = ''

    let authService: AuthService;
    let tokenRepository: TokenRepositoryLocalStorage;
    let routerService: RouterServiceReactRouter;
    let loginUseCase: LoginUseCase;

    beforeEach(() => {
        authService = {
            login: vi.fn().mockResolvedValue(token),
        };

        tokenRepository = {
            save: vi.fn()
        } as unknown as TokenRepository

        routerService = {
            goToRecipes: vi.fn(),
        } as unknown as RouterServiceReactRouter

        loginUseCase = new LoginUseCase(authService, tokenRepository, routerService)
    })

    it('login should be called with correct arguments', async () => {
        await loginUseCase.login(email, password)

        expect(authService.login).toHaveBeenCalledWith(email, password)
    })

    it('should save the jwt when user is logged', async () => {

        await loginUseCase.login(email, password)

        expect(tokenRepository.save).toHaveBeenCalled()
        expect(tokenRepository.save).toHaveBeenCalledWith(token)
    })

    it('should navigate to recipes', async () => {

        await loginUseCase.login(email, password);

        expect(routerService.goToRecipes).toBeCalled();

    })
})