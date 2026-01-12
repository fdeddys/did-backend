import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SeedService } from './seed.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly seedService: SeedService,
        ) {
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body('refresh_token') refreshToken: string ) {
        return this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req) {
    return this.authService.logout(req.user.id);
    }

    @Public()
    @Get('dev/seed')
    async seed() {
        return await this.seedService.runSeed();    
    }

}
