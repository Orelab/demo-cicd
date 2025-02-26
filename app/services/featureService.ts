import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Feature {
  id: number;
  name: string;
  description: string;
  resourceUrl: string;
  addedAt: Date;
}

export interface FeatureInput {
  name: string;
  description: string;
  resourceUrl: string;
}

export class FeatureService {
  static async getFeatures(page: number, limit: number = 10) {
    const features = await prisma.feature.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { addedAt: 'desc' }
    });

    const total = await prisma.feature.count();

    return {
      features,
      total,
      pages: Math.ceil(total / limit)
    };
  }

  static async createFeature(data: FeatureInput) {
    return await prisma.feature.create({ data });
  }
}
