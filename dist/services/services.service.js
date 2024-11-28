"use strict";
// src/services/services.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const typeorm_2 = require("typeorm");
const version_entity_1 = require("./entities/version.entity");
let ServicesService = class ServicesService {
    constructor(servicesRepository, versionsRepository) {
        this.servicesRepository = servicesRepository;
        this.versionsRepository = versionsRepository;
    }
    async findAll(filter, sort, page, limit) {
        const where = {};
        if (filter) {
            where.name = (0, typeorm_2.Like)(`%${filter}%`);
        }
        const order = {};
        if (sort) {
            const [field, direction] = sort.split(',');
            order[field] = direction.toUpperCase();
        }
        return this.servicesRepository.find({
            where,
            order,
            skip: page && limit ? (page - 1) * limit : undefined,
            take: limit,
        });
    }
    async findOne(id) {
        const service = await this.servicesRepository.findOne({
            where: { id },
            relations: ['versions'],
        });
        if (!service) {
            throw new Error(`Service with id ${id} not found`);
        }
        return service;
    }
    async findVersionsByServiceId(serviceId) {
        return this.versionsRepository.find({
            where: { service: { id: serviceId } },
        });
    }
    // CRUD operations if needed
    async create(serviceData) {
        const service = this.servicesRepository.create(serviceData);
        return this.servicesRepository.save(service);
    }
    async createVersion(serviceId, versionData) {
        const service = await this.servicesRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new Error(`Service with id ${serviceId} not found`);
        }
        const version = this.versionsRepository.create({
            ...versionData,
            service,
        });
        return this.versionsRepository.save(version);
    }
    async update(id, updateData) {
        await this.servicesRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.servicesRepository.delete(id);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(version_entity_1.Version)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
