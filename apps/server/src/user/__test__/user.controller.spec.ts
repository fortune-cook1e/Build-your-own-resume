import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { userListSchema } from '@/user/dto/user.dto';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createId } from '@paralleldrive/cuid2';
import * as bcrypt from 'bcryptjs';
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [DatabaseModule, ConfigModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('get all users', () => {
    it('should return an array of users', async () => {
      const salt = await bcrypt.genSalt(10);
      const users = [
        {
          id: createId(),
          name: 'name',
          username: 'username',
          email: 'email@email.com',
          emailVerified: false,
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
          salt,
          refreshToken: null,
          lastSignedIn: null,
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const results = userListSchema.parse(await userController.getAllUser());
      expect(results).toEqual(userListSchema.parse(users));
    });
  });
});
