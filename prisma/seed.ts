import "dotenv/config"
import { PrismaClient, UserRole, Status, OrderStatus, PaymentStatus } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('password123', 10)

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      phone: '+923001234567',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      phone: '+923001234568',
      name: 'Ahmed Khan',
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    },
  })

  console.log('✅ Users created')

  // Create Product Ranges
  const karbonic = await prisma.productRange.create({
    data: {
      name: 'Karbonic',
      slug: 'karbonic',
      tagline: 'Fine Polycarbonate Switches',
      description: 'Premium polycarbonate switches with exceptional durability.',
      highlights: [
        'Made from high-grade polycarbonate',
        'UV resistant and long-lasting',
        'Available in multiple color finishes',
      ],
      status: Status.ACTIVE,
      sortOrder: 1,
    },
  })

  console.log('✅ Product ranges created')

  // Create Filter Categories
  const colorCategory = await prisma.filterCategory.create({
    data: {
      name: 'Color Finishes',
      slug: 'color-finishes',
      sortOrder: 1,
    },
  })

  const whiteColor = await prisma.filterAttribute.create({
    data: {
      categoryId: colorCategory.id,
      name: 'White',
      value: 'white',
      colorCode: '#FFFFFF',
    },
  })

  console.log('✅ Filters created')

  // Create Sample Product
  const product1 = await prisma.product.create({
    data: {
      name: 'Karbonic 1 Gang Switch',
      slug: 'karbonic-1-gang-switch-white',
      productCode: 'KAR-1G-SW-WH',
      rangeId: karbonic.id,
      description: 'Single gang switch with premium polycarbonate finish.',
      price: 350,
      stockQuantity: 500,
      specifications: {
        voltage: '240V',
        current: '16A',
        warranty: '2 Years',
      },
      status: Status.ACTIVE,
      images: {
        create: [
          {
            imageUrl: '/images/products/karbonic-1g-white-1.jpg',
            altText: 'Karbonic 1 Gang Switch - White',
            sortOrder: 1,
            isPrimary: true,
          },
        ],
      },
      attributes: {
        create: [
          {
            attributeId: whiteColor.id,
          },
        ],
      },
    },
  })

  console.log('✅ Products created')

  // Create System Settings
  await prisma.systemSettings.createMany({
    data: [
      {
        key: 'SHIPPING_COST_FLAT',
        value: '200',
        description: 'Flat shipping cost in PKR',
      },
      {
        key: 'WHATSAPP_NUMBER',
        value: '+923001234567',
        description: 'WhatsApp business number',
      },
    ],
  })

  console.log('✅ System settings created')
  console.log('✨ Seed completed!')
  console.log('')
  console.log('Test Accounts:')
  console.log('Admin: admin@example.com / password123')
  console.log('Customer: customer@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })