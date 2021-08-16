import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/core/database/mysql/entities';
import { BcryptHelper } from 'src/common/helpers';
import { MySQLRepositoryService } from 'src/core/repositories';
import { UpdatePasswordDTO } from './dtos';
import { UsersPolicies } from './others/users.policies';
import { Dictionary } from 'odyssey-dictionary';
import { SuccessSaveMessage } from '../../common/types';

@Injectable()
export class UsersService {

	constructor(
		private readonly mysqlRepository: MySQLRepositoryService,
		private readonly bcryptHelper: BcryptHelper,
		private readonly usersPolicies: UsersPolicies
	) {}

	public async create(user: CreateUserDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.passwordsMustBeTheSame(user.password, user.confirm_password);

		const newUser = new User();

		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = await this.bcryptHelper.hashString(user.password);
		newUser.type = user.type;

		const createdUser = await this.mysqlRepository.save(User, newUser);

		return {
			message: Dictionary.users.getMessage('successfully_created'),
			id: createdUser.id
		};
	}

	public async updatePassword(id: string, { password, confirm_password }: UpdatePasswordDTO): Promise<SuccessSaveMessage> {

		this.usersPolicies.passwordsMustBeTheSame(password, confirm_password);

		const user = await this.mysqlRepository.findOne(User, id);

		this.usersPolicies.mustHaveUser(user);

		user.password = await this.bcryptHelper.hashString(password);

		await this.mysqlRepository.save(User, user);

		return {
			message: Dictionary.users.getMessage('password_successfully_updated'),
			id
		};
	}

}
