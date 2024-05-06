import { OssModule } from '@/oss/oss.module';
import { PrintService } from '@/print/print.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [OssModule],
  providers: [PrintService],
  exports: [PrintService],
})
export class PrintModule {}
