import { LoginDto } from '../types/dto/auth.dto';
import { LoginEntity } from '../types/entity/auth.entity';
import request from '@/web/app/utils/request';

export const login = (data: LoginDto): Promise<LoginEntity> =>
  request.post('/auth/login', data);
