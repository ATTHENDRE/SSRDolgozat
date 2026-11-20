import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise'
import {FoglalasDTO} from './FoglalasokDTO.dto.js'


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e'
});


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async ujFoglalas(name: string, email: string, startDate: Date, guests: number) {
    const [result] = await pool.execute(
      'INSERT INTO reservations (name, email, startDate, guests) VALUES (?, ?, ?, ? )',
      [name, email, startDate, guests],
    );
    console.log(result);
  }
}
