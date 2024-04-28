import { PrintService } from '@/print/print.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrintService],
  exports: [PrintService],
})
export class PrintModule {}
