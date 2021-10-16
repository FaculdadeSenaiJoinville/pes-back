
import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import * as dotenv from 'dotenv';
import { DialogflowModule } from './dialogflow/dialogflow.module';
import { MySQLRepositoryModule } from '../../core/repository';
import { BotIntentModule } from './intent/intent.module';

dotenv.config();

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule,
		BotIntentModule
	],
	controllers: [
		ChatbotController
	],
	providers: [
		ChatbotService
	],
	exports: [
		ChatbotService
	]
})
export class ChatbotModule {}
