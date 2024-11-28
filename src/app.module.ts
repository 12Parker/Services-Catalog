import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,        
      username: 'postgres', 
      password: 'password', 
      database: 'services',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServicesModule,
  ],
})
export class AppModule {}
