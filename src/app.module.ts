import { Event } from './events/event.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { AppJapanService } from './app.japan.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3307,
            username: 'root',
            password: 'taideptrai',
            database: 'nestjs',
            entities: [Event],
            synchronize: true,
        }),
        EventsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: AppService,
            useClass: AppJapanService,
        },
    ],
})
export class AppModule {}
