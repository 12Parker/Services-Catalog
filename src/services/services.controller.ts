import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { Service } from "./entities/service.entity";
import { Version } from "./entities/version.entity";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("services")
@UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query("filter") filter?: string,
    @Query("sort") sort?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ): Promise<Service[]> {
    return this.servicesService.findAll(
      filter,
      sort,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 10
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Service> {
    return this.servicesService.findOne(+id);
  }

  @Get(":id/versions")
  async findVersions(@Param("id") id: string): Promise<Version[]> {
    return this.servicesService.findVersionsByServiceId(+id);
  }

  // CRUD operations
  @Post()
  async create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }

  @Post(":id/versions")
  async createVersion(
    @Param("id") id: string,
    @Body() versionData: { versionNumber: string }
  ): Promise<Version> {
    return this.servicesService.createVersion(+id, versionData);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateData: Partial<Service>
  ): Promise<Service> {
    return this.servicesService.update(+id, updateData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.servicesService.remove(+id);
  }
}
