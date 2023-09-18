import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from 'src/infra/user/repository';
import { EmailException } from '../utils/errors/email-exits';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IdNotFoundException } from '../utils/errors/idnotfound';
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { email } = createUserDTO;

    const isEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (isEmailAlreadyExists) {
      throw new EmailException();
    }

    const createUser = {
      email: createUserDTO.email,
      name: createUserDTO.email,
      cpf: createUserDTO.cpf,
      password: await bcrypt.hash(createUserDTO.password, 10),
      age: createUserDTO.age,
      location: createUserDTO.location,
      income: createUserDTO.income,
    };

    const createdUser = await this.userRepository.create(createUser);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new IdNotFoundException(id);
    }

    if (updateUserDTO.password) {
      const hashedPassword = await bcrypt.hash(updateUserDTO.password, 10);
      updateUserDTO.password = hashedPassword;
    }

    const updateUser = await this.userRepository.update(id, updateUserDTO);

    return {
      ...updateUser,
      password: undefined,
    };
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
