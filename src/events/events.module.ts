import { Module } from '@nestjs/common';
import { Event } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventsController],
})
export class EventsModule {}
