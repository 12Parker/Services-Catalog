import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { Version } from './entities/version.entity';

describe('ServicesService', () => {
  let service: ServicesService;
  let servicesRepository: Repository<Service>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Version),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    servicesRepository = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
