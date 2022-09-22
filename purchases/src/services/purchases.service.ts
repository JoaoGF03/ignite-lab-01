import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  findAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findAllPurchasesByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return await this.prisma.purchase.create({
      data: {
        productId,
        customerId,
      },
    });
  }
}
