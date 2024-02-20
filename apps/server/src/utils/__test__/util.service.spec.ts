import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from '../utils.service';
import { RedisService } from '@songkeys/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

describe('UtilsService', () => {
  let utilsService: UtilsService;
  let redisServiceMock: Partial<RedisService>;
  let configServiceMock: Partial<ConfigService>;
  let redisGetSpy: jest.SpyInstance;
  let redisSetSpy: jest.SpyInstance;

  beforeEach(async () => {
    redisServiceMock = {
      getClient: jest.fn(() => new Redis()),
    };

    configServiceMock = {
      getOrThrow: jest.fn(() => 'REDIS_NAMESPACE'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
        { provide: RedisService, useValue: redisServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    utilsService = module.get<UtilsService>(UtilsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached value if present', async () => {
    const key = 'testKey';
    const cachedValue = 'cachedValue'; // Modify this to be a string

    redisGetSpy = jest
      .spyOn(utilsService.redis, 'get')
      .mockResolvedValue(cachedValue);

    const callback = jest.fn(); // This should not be called since we have a cached value

    const result = await utilsService.getCacheOrSet(
      key,
      callback,
      undefined,
      'string',
    );

    expect(result).toEqual(cachedValue);
    expect(callback).not.toHaveBeenCalled();
    expect(redisGetSpy).toHaveBeenCalledWith(key);
  });

  it('should call callback and cache the result if not present in cache', async () => {
    const key = 'testKey';
    const callbackValue = 'callbackValue';

    redisGetSpy = jest.spyOn(utilsService.redis, 'get').mockResolvedValue(null);
    redisSetSpy = jest.spyOn(utilsService.redis, 'set').mockResolvedValue(null); // Adjusted here

    const callback = jest.fn().mockResolvedValue(callbackValue);

    const result = await utilsService.getCacheOrSet(
      key,
      callback,
      undefined,
      'string',
    );

    expect(result).toEqual(callbackValue);
    expect(callback).toHaveBeenCalled();
    expect(redisGetSpy).toHaveBeenCalledWith(key);
    expect(redisSetSpy).toHaveBeenCalledWith(
      key,
      callbackValue,
      'PX',
      expect.any(Number),
    );
  });

  it('should serialize value to JSON if type is "json"', async () => {
    const key = 'testKey';
    const callbackValue = { name: 'John', age: 30 };

    redisGetSpy = jest.spyOn(utilsService.redis, 'get').mockResolvedValue(null);
    redisSetSpy = jest.spyOn(utilsService.redis, 'set').mockResolvedValue(null); // Adjusted here

    const callback = jest.fn().mockResolvedValue(callbackValue);

    const result = await utilsService.getCacheOrSet(
      key,
      callback,
      undefined,
      'json',
    );

    expect(result).toEqual(callbackValue);
    expect(redisSetSpy).toHaveBeenCalledWith(
      key,
      JSON.stringify(callbackValue),
      'PX',
      expect.any(Number),
    );
  });
});
