import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto, CreateAdminResponseDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { DeleteAdminResponseDto } from './dto/delete-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(
    createAdminDto: CreateAdminDto,
  ): Promise<CreateAdminResponseDto> {
    const newUser = await this.userRepository.upsert(
      {
        ...createAdminDto,
        admin: true,
      },
      ['email'],
    );

    if (!newUser)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return {
      message: 'Admin created successfully',
    };
  }

  public async remove(email: string): Promise<DeleteAdminResponseDto> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
