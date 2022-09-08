import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private readonly logger = new Logger('ProductsService');

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(error); // this is shown in console
      throw new HttpException( // this is sent to the client
        'Failed to save Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find();
      if (!products) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // this is sent to the client
      }
      return products;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException( // this is sent to the client
        'Failed to find Products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // this is sent to the client
      }
      return product;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException( // this is sent to the client
        'Failed to find Product by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // this is sent to the client
      }
      return this.productRepository.save({ ...product, ...updateProductDto });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException( // this is sent to the client
        'Failed to update Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.productRepository.delete({ id: id });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException( // this is sent to the client
        'Failed to delete Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
