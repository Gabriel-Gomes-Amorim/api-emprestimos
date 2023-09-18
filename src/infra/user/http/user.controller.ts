import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/user/dto/create-user.dto';
import { UserService } from 'src/domain/user/user.service';
import { Request, Response } from 'express';
import { Prisma } from '.prisma/client';
import { UpdateUserDTO } from 'src/domain/user/dto/update-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const user = await this.userService.create(createUserDTO);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Usuario cadastrado com sucesso!', user });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao criar usuario!', error: error });
    }
  }

  @Get(':id')
  async show(
    @Param('id')
    id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.findById(id);

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar usuario!', error: error });
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const updateUser = await this.userService.update(id, data);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Usuario atualizado com sucesso!', updateUser });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao atualizar o usuario!', error: error });
    }
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
