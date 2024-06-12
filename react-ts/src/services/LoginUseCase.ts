import { AuthService } from "./AuthService.ts";
import { RouterService } from "./RouterService.ts";
import { TokenRepository } from "./TokenRepository.ts";

export class LoginUseCase {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenRepository: TokenRepository,
        private readonly routerService: RouterService,
    ) { }

    async login(email: string, password: string): Promise<void> {
        const jwt = await this.authService.login(email, password);

        this.tokenRepository.save(jwt);

        this.routerService.goToRecipes();
    }
}