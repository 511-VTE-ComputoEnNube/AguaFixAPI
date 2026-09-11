import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: CreateUserDto): Promise<{ userId: number }> {
    const id = await this.usersService.create(dto);
    return { userId: id };
  }

  async login(dto: LoginDto): Promise<{ message: string; userId: number }> {
    const user = await this.usersService.validate(dto.email, dto.password);
    if (!user) {
      throw new BadRequestException('Credenciales inválidas: correo o contraseña incorrectos');
    }
    return {
      message: 'Login exitoso',
      userId: user.id,
    };
  }
}