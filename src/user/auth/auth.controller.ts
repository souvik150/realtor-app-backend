import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseEnumPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto, GenerateProductKetDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { User, UserInfo } from '../decorators/user.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }

    return this.authService.signup(body, userType);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() { userType, email }: GenerateProductKetDto) {
    return this.authService.generateProuctKey(email, userType);
  }

  @Get('/me')
  me(@User() user: UserInfo) {
    return user;
  }
}
