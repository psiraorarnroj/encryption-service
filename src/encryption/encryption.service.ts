import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { config } from '../config';

@Injectable()
export class EncryptionService {
  private iv: Buffer; // Store IV internally

  encryptData(payload: string) {
    const aesKey = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16); // Generate IV and store internally

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, this.iv);
    let encryptedPayload = cipher.update(payload, 'utf8', 'base64');
    encryptedPayload += cipher.final('base64');

    const encryptedAesKey = crypto.publicEncrypt(config.publicKey, aesKey);

    return {
      data1: encryptedAesKey.toString('base64'),
      data2: encryptedPayload,
    };
  }

  decryptData(data1: string, data2: string) {
    const aesKey = crypto.privateDecrypt(
      config.privateKey,
      Buffer.from(data1, 'base64'),
    );

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      aesKey,
      this.iv, // Use internally stored IV
    );
    let decryptedPayload = decipher.update(data2, 'base64', 'utf8');
    decryptedPayload += decipher.final('utf8');

    return decryptedPayload;
  }
}
