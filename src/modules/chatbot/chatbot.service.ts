import { Injectable } from '@nestjs/common';
import { DialogflowService } from './dialogflow/dialogflow.service';

@Injectable()
export class ChatbotService {

	constructor(private readonly dialogflowService: DialogflowService) {}

	public sendMessage() {

		return 'Olá';
	}

}
