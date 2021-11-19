
import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { DialogflowModule } from './dialogflow/dialogflow.module';
import { MySQLRepositoryModule } from '../../core/repository';
import { BotIntentModule } from './intent/intent.module';
import { BotContentModule } from './content/content.module';

@Module({
	imports: [
		DialogflowModule,
		MySQLRepositoryModule,
		BotIntentModule,
		BotContentModule
	],
	providers: [
		ChatbotService
	],
	exports: [
		ChatbotService
	]
})
export class ChatbotModule {}
