import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CREATE_USER_VALIDATION, UPDATE_PASSWORD_VALIDATION, UPDATE_USER_VALIDATION } from './utils/users.validation';
import { User } from 'src/core/database/mysql/entities';
import { ValidateBodyPipe } from 'src/common/pipes';
import { ApiController, AuthProtection } from 'src/common/decorators';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dtos';
import { ListOptions, SuccessSaveMessage } from '../../common/types';
import { UsersPaginationPipe } from './utils/users.pagination.pipe';
import { UsersRepository } from './utils/users.repository';

@ApiController('users')
export class UsersController {

	constructor(
		private readonly userService: UsersService,
		private readonly usersRepository: UsersRepository
	) {}

	@Get('list')
	@AuthProtection()
	public list(@Query(new UsersPaginationPipe()) options: ListOptions<User>): Promise<[User[], number]> {

		return this.usersRepository.list(options);
	}

	@Get('details/:id')
	@AuthProtection()
	public details(@Param('id') id: string): Promise<User> {

		return this.usersRepository.details(id);
	}

	@Post('create')
	@AuthProtection()
	public create(@Body(new ValidateBodyPipe(CREATE_USER_VALIDATION)) user: CreateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.create(user);
	}

	@Put('update-password/:id')
	@AuthProtection()
	public updatePassword(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_PASSWORD_VALIDATION)) password_payload: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		return this.userService.updatePassword(id, password_payload);
	}

	@Put('update-status/:id')
	@AuthProtection()
	public updateStatus(@Param('id') id: string): Promise<SuccessSaveMessage> {

		return this.userService.updateStatus(id);
	}
	
	@Put('update/:id')
	@AuthProtection()
	public update(@Param('id') id: string, @Body(new ValidateBodyPipe(UPDATE_USER_VALIDATION)) user: UpdateUserDTO): Promise<SuccessSaveMessage> {

		return this.userService.update(id, user);
	}

}
