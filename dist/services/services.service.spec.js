"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const services_service_1 = require("./services.service");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const typeorm_2 = require("typeorm");
const version_entity_1 = require("./entities/version.entity");
describe('ServicesService', () => {
    let service;
    let servicesRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                services_service_1.ServicesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(service_entity_1.Service),
                    useClass: typeorm_2.Repository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(version_entity_1.Version),
                    useClass: typeorm_2.Repository,
                },
            ],
        }).compile();
        service = module.get(services_service_1.ServicesService);
        servicesRepository = module.get((0, typeorm_1.getRepositoryToken)(service_entity_1.Service));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
