import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyModule(watts: number) {
    console.log(`Supplying: ${watts} of power`);
  }
}
