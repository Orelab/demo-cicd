import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;

  const features = await prisma.feature.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { addedAt: 'desc' }
  });

  const total = await prisma.feature.count();

  return NextResponse.json({
    features,
    total,
    pages: Math.ceil(total / limit)
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const feature = await prisma.feature.create({
    data: {
      name: data.name,
      description: data.description,
      resourceUrl: data.resourceUrl
    }
  });

  return NextResponse.json(feature);
}
