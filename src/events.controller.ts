import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event-dto';

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {
        return [
            { id: 1, name: 'Cuong ngu' },
            { id: 2, name: 'Cuong ngu' },
            { id: 3, name: 'Cuong ngu' },
            { id: 4, name: 'Cuong ngu' },
            { id: 5, name: 'Cuong ngu' },
        ];
    }
    @Get(':id')
    findOne(@Param('id') id) {
        return id;
    }
    @Post()
    create(@Body() input: CreateEventDto) {
        return input;
    }
    @Patch(':id')
    update(@Param('id') id, @Body() input) {
        return input;
    }
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id) {}
}
