import { Module } from '@nestjs/common';
import { EncryptionModule } from './encryption/encryption.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EncryptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
