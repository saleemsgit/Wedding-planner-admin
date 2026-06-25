import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("AdminPass123!", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@weddings.local",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+94711234567",
      isActive: true,
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create demo customer
  const customerPassword = await bcrypt.hash("Customer123!", 10);
  const customer = await prisma.user.create({
    data: {
      name: "Aisha Mohammed",
      email: "aisha@example.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
      phone: "+94712345678",
      isActive: true,
    },
  });
  console.log("✅ Customer user created:", customer.email);

  // Create wedding plan for customer
  await prisma.weddingPlan.create({
    data: {
      customerId: customer.id,
      weddingDate: new Date("2026-12-15"),
      partnerName: "Amir Khan",
      currentStage: "ENGAGEMENT",
      totalBudget: 2500000, // LKR
    },
  });

  // Create service categories
  const categories = [
    {
      name: "Wedding Halls & Venues",
      slug: "wedding-halls",
      description: "Luxury wedding venues and banquet halls",
      displayOrder: 1,
    },
    {
      name: "Catering Services",
      slug: "catering",
      description: "Professional catering for wedding events",
      displayOrder: 2,
    },
    {
      name: "Photography & Videography",
      slug: "photography",
      description: "Professional wedding photography and videography",
      displayOrder: 3,
    },
    {
      name: "Bridal Dressing",
      slug: "bridal-dressing",
      description: "Bridal makeup and styling services",
      displayOrder: 4,
    },
    {
      name: "Mehndi Artists",
      slug: "mehndi",
      description: "Professional mehndi application services",
      displayOrder: 5,
    },
    {
      name: "Decoration & Flowers",
      slug: "decoration",
      description: "Wedding decoration and floral arrangements",
      displayOrder: 6,
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.category.create({
        data: cat,
      })
    )
  );
  console.log(`✅ Created ${createdCategories.length} categories`);

  // Create demo vendor
  const vendor = await prisma.vendor.create({
    data: {
      categoryId: createdCategories[0].id, // Wedding Halls
      businessName: "Taj Palace",
      description:
        "Elegant wedding venue with stunning architecture and world-class amenities",
      email: "info@tajpalace.lk",
      phone: "+94711111111",
      location: "Colombo 7",
      address: "123 Galle Road, Colombo 7",
      baseImage:
        "https://images.unsplash.com/photo-1519167271335-ea18dee7e807?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519167271335-ea18dee7e807?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      ],
      rating: 4.8,
      reviewCount: 45,
      isVerified: true,
      isFeatured: true,
      isActive: true,
      minPrice: 500000,
      maxPrice: 2000000,
    },
  });
  console.log("✅ Demo vendor created:", vendor.businessName);

  // Create demo service
  const service = await prisma.service.create({
    data: {
      vendorId: vendor.id,
      categoryId: createdCategories[0].id,
      title: "Grand Wedding Hall Package",
      slug: "taj-palace-grand",
      description: "Complete wedding hall setup with catering included",
      longDescription:
        "Experience luxury at Taj Palace with our grand wedding package. Includes beautiful hall setup, premium catering, and professional event management for your special day.",
      images: vendor.images,
      basePrice: 750000, // LKR
      discountedPrice: 650000,
      discountPercentage: 13,
      isActive: true,
      duration: 8, // hours
    },
  });
  console.log("✅ Demo service created:", service.title);

  // Create packages for service
  const packages = await Promise.all([
    prisma.package.create({
      data: {
        serviceId: service.id,
        vendorId: vendor.id,
        name: "Basic Package",
        description: "Hall rental with basic setup",
        price: 500000,
        features: ["Hall rental 8 hours", "Basic decoration", "Parking"],
        guestCapacity: 200,
        isActive: true,
      },
    }),
    prisma.package.create({
      data: {
        serviceId: service.id,
        vendorId: vendor.id,
        name: "Premium Package",
        description: "Hall + Catering + Decoration",
        price: 750000,
        discountedPrice: 650000,
        features: [
          "Hall rental 8 hours",
          "Premium decoration",
          "Catering for 400 guests",
          "Professional event management",
          "Parking",
        ],
        guestCapacity: 400,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${packages.length} packages`);

  // Create demo deal
  const deal = await prisma.deal.create({
    data: {
      title: "Wedding Halls Special Offer",
      description: "15% discount on wedding hall bookings made before June 30",
      categoryId: createdCategories[0].id,
      vendorId: vendor.id,
      serviceId: service.id,
      images: vendor.images,
      discountType: "PERCENTAGE",
      discountValue: 15,
      discount: 15,
      originalPrice: 750000,
      discountedPrice: 637500,
      startDate: new Date(),
      endDate: new Date("2026-06-30"),
      isActive: true,
    },
  });
  console.log("✅ Demo deal created:", deal.title);

  console.log("\n✅ Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
