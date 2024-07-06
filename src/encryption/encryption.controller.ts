import { Controller, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('/get-encrypt-data')
  @ApiBody({
    schema: { type: 'object', properties: { payload: { type: 'string' } } },
  })
  @ApiResponse({ status: 201, description: 'Data encrypted successfully' })
  getEncryptData(@Body('payload') payload: string) {
    const result = this.encryptionService.encryptData(payload);
    return { successful: true, error_code: null, data: result };
  }

  @Post('/get-decrypt-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { data1: { type: 'string' }, data2: { type: 'string' } },
    },
  })
  @ApiResponse({ status: 201, description: 'Data decrypted successfully' })
  getDecryptData(@Body() body: { data1: string; data2: string }) {
    const payload = this.encryptionService.decryptData(body.data1, body.data2);
    return { successful: true, error_code: null, data: { payload } };
  }
}
