import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<number> {
    const exists = await this.userRepository.findOneBy({ email: dto.email });
    if (exists) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      isNotificationEnabled: dto.isNotificationEnabled,
    });

    const saved = await this.userRepository.save(user);
    return saved.id;
  }

  async validate(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }
}