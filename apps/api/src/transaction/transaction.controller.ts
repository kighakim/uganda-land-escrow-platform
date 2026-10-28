import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('initiate')
  async initiate(@Body() data: any) {
    return this.transactionService.initiateTransaction(data);
  }
   @Patch(':id/lock-funds')
   lockFunds(@Param('id') id: string) {
     return this.transactionService.lockFunds(id);
   }
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
}