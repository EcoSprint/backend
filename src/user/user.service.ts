import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public findMe(user: Express.User) {
    return user;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  public async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
