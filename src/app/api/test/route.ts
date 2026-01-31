import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    
    return NextResponse.json({
      success: true,
      data: {
        users: userCount,
        products: productCount,
        message: 'Database connected successfully!'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Database connection failed'
    }, { status: 500 })
  }
}