import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
    ) {}

    @Get()
    async findAll() {
        return await this.repository.find();
    }
    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'name'],
            where: [
                {
                    id: 3,
                    when: MoreThan(new Date('2021-02-12T13:00:00')),
                },
                {
                    description: Like('%aaa%'),
                },
            ],
            take: 2,
            order: {
                id: 'ASC',
            },
        });
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(typeof id);
        return await this.repository.findOne({
            where: {
                id: id,
            },
        });
    }
    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(),
        });
    }
    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date() : event.when,
        });
    }
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);
    }
}
