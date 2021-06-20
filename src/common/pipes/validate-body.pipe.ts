import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as Yup from 'yup';

@Injectable()
export class ValidateBodyPipe implements PipeTransform {

	constructor(private yupSchema: Yup.ObjectSchema<any>) {}

	public async transform(body: any) {
        
		return this.yupSchema.validate(body).catch(response => {

			throw new BadRequestException(response.errors.join('; '))
		});
	}

}
