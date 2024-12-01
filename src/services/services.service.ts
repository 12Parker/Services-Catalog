// src/services/services.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository, FindOptionsWhere, Like, FindOptionsOrder  } from 'typeorm';
import { Version } from './entities/version.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}

  async findAll(
    filter?: string,
    sort?: string,
    page?: number,
    limit?: number,
  ): Promise<Service[]> {
    const where: FindOptionsWhere<Service> = {};
    if (filter) {
      where.name = Like(`%${filter}%`);
    }
  
    const order: FindOptionsOrder<Service> = {};
    if (sort) {
      const [field, direction] = sort.split(',');
      order[field as keyof Service] = direction.toUpperCase() as 'ASC' | 'DESC';
    }
  
    return this.servicesRepository.find({
      where,
      order,
      relations: ['versions'],
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['versions'],
    });
  
    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }
  
    return service;
  }

  async findVersionsByServiceId(serviceId: number): Promise<Version[]> {
    return this.versionsRepository.find({
      where: { service: { id: serviceId } },
    });
  }

  // CRUD operations
  async create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.servicesRepository.create(serviceData);
    return this.servicesRepository.save(service);
  }

  async createVersion(serviceId: number, versionData: { versionNumber: string }): Promise<Version> {
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
  

  async update(id: number, updateData: Partial<Service>): Promise<Service> {
    await this.servicesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
