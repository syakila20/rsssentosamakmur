import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // CATEGORY

  // ====================================================
  // PROMO CATEGORY
  // ====================================================

  console.log("📦 Seeding Promo Categories...");

  const mcuCategory = await prisma.promoCategory.upsert({
    where: { slug: "medical-check-up" },
    update: {},
    create: {
      name: "Medical Check Up",
      slug: "medical-check-up",
      description: "Paket pemeriksaan kesehatan menyeluruh",
    },
  });

  const womenCategory = await prisma.promoCategory.upsert({
    where: { slug: "kesehatan-wanita" },
    update: {},
    create: {
      name: "Kesehatan Wanita",
      slug: "kesehatan-wanita",
      description: "Program kesehatan khusus wanita",
    },
  });

  const vaccineCategory = await prisma.promoCategory.upsert({
    where: { slug: "vaksinasi" },
    update: {},
    create: {
      name: "Vaksinasi",
      slug: "vaksinasi",
      description: "Layanan vaksinasi untuk individu dan keluarga",
    },
  });

  console.log("📦 Seeding Promos...");

  const promos = [
    {
      slug: "medical-check-up-standard-2026",
      categoryId: mcuCategory.id,

      title: "Medical Check Up Standard 2026",

      shortDescription:
        "Paket pemeriksaan kesehatan dasar untuk pria dan wanita dewasa.",

      description:
        "Paket Medical Check Up Standard dirancang untuk membantu deteksi dini berbagai kondisi kesehatan umum.",

      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",

      originalPrice: 1250000,
      promoPrice: 990000,
      discountPercent: 21,

      gender: "ALL",

      minAge: 18,
      maxAge: 100,

      patientRecommendation:
        "Direkomendasikan untuk pemeriksaan kesehatan rutin tahunan.",

      preparation:
        "Puasa 10-12 jam sebelum pemeriksaan laboratorium. Tetap diperbolehkan minum air putih.",

      termsCondition: "Berlaku hingga 31 Desember 2026. Reservasi minimal H-1.",

      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),

      isFeatured: true,
      isActive: true,

      benefits: [
        "Konsultasi Dokter Umum",
        "Pemeriksaan Fisik Lengkap",
        "Hematologi Lengkap",
        "Kolesterol Total",
        "Glukosa Puasa",
        "Urine Lengkap",
        "Rontgen Dada",
        "EKG",
      ],
    },

    {
      slug: "mcu-diamond-female",

      categoryId: womenCategory.id,

      title: "MCU Diamond Female",

      shortDescription:
        "Pemeriksaan kesehatan komprehensif untuk wanita usia di atas 45 tahun.",

      description:
        "Paket MCU premium untuk wanita dengan fokus pada kesehatan jantung, hormon, metabolik, dan deteksi dini kanker wanita.",

      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634",

      originalPrice: 18000000,
      promoPrice: 15000000,

      discountPercent: 17,

      gender: "FEMALE",

      minAge: 45,
      maxAge: 100,

      patientRecommendation:
        "Direkomendasikan untuk wanita usia di atas 45 tahun.",

      preparation:
        "Puasa 10-12 jam. Tidak sedang menstruasi saat pemeriksaan tertentu.",

      termsCondition: "Berlaku hingga 31 Mei 2026. Reservasi minimal H-2.",

      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-05-31"),

      isFeatured: true,
      isActive: true,

      benefits: [
        "Konsultasi Dokter Jantung",
        "Konsultasi Dokter Penyakit Dalam",
        "HbA1c",
        "Echocardiography",
        "Treadmill",
        "USG Mammae",
        "Pap Smear",
        "CT Calcium Score",
        "MRI Brain",
        "Vitamin D",
      ],
    },

    {
      slug: "paket-vaksin-influenza-keluarga",

      categoryId: vaccineCategory.id,

      title: "Paket Vaksin Influenza Keluarga",

      shortDescription:
        "Perlindungan optimal untuk seluruh anggota keluarga dari influenza musiman.",

      description:
        "Program vaksin influenza keluarga dengan harga spesial dan perlindungan menyeluruh.",

      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb",

      originalPrice: 450000,
      promoPrice: 350000,

      discountPercent: 22,

      gender: "ALL",

      minAge: 6,
      maxAge: 100,

      patientRecommendation: "Disarankan untuk anak-anak, dewasa, dan lansia.",

      preparation: "Pastikan dalam kondisi sehat saat vaksinasi.",

      termsCondition: "Berlaku selama stok vaksin tersedia.",

      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),

      isFeatured: false,
      isActive: true,

      benefits: [
        "Konsultasi Dokter",
        "Vaksin Influenza Quadrivalent",
        "Observasi Pasca Vaksin",
        "Sertifikat Vaksinasi",
      ],
    },
  ];

  for (const promo of promos) {
    const { benefits, ...promoData } = promo;

    const savedPromo = await prisma.promo.upsert({
      where: {
        slug: promo.slug,
      },

      update: promoData,

      create: promoData,
    });

    await prisma.promoBenefit.deleteMany({
      where: {
        promoId: savedPromo.id,
      },
    });

    await prisma.promoBenefit.createMany({
      data: benefits.map((title) => ({
        promoId: savedPromo.id,
        title,
      })),
    });
  }

  console.log("✅ Promo Seed Completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
