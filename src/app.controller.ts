import { Controller, Get, Post, Render, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service.js';
import {FoglalasDTO} from './FoglalasokDTO.dto.js'



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Hotel'
    }
  }


  @Post('ujFoglalas')
    @Render('index')
  async createFoglalasDTO(@Body() body: FoglalasDTO) {
    const FoglalasRegex = {
      name: /^[\p{L}][\p{L}\s]{0,20}[\p{L}]$/u,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      guests: /^[0-9]+$/    
    };
    if (
      !FoglalasRegex.name.test(body.name) ||
      !FoglalasRegex.email.test(body.email) ||
      !FoglalasRegex.guests.test(String(body.guests))
    ) {
      throw new BadRequestException('Hiba: A megadott adatok nem felelnek meg a formátumnak.');
    }


    await this.appService.ujFoglalas(
      body.name,
      body.email,
      body.startDate,
      body.guests
    );

    return {
      title: 'Sikeres Foglalás!',
      name: body.name
    };
  }
}


