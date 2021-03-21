import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './others/user.repository';
import { UserService } from './user.service';
import { userProvider } from './others/users.provider';
import { DatabaseModule } from 'src/modules/database/database.module';
import { BcryptHelper, ErrorHelper, YupHelper } from 'src/helpers';

@Module({
	imports: [
		DatabaseModule
	],
	controllers: [
		UserController
	],
	providers: [
		...userProvider,
		UserRepository,
		UserService,
		BcryptHelper,
		ErrorHelper,
		YupHelper
	],
	exports: [
		UserRepository,
		UserService
	]
})
export class UserModule {}
