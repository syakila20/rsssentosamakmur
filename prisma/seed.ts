/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PERMISSIONS } from "../config/permission";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const tags = [
    { name: "Imunisasi", slug: "imunisasi" },
    { name: "Vaksin", slug: "vaksin" },
    { name: "Demam", slug: "demam" },
    { name: "Batuk & Flu", slug: "batuk-flu" },
    { name: "Diabetes", slug: "diabetes" },
    { name: "Hipertensi", slug: "hipertensi" },
    { name: "Vitamin", slug: "vitamin" },
    { name: "ASI", slug: "asi" },
    { name: "Tumbuh Kembang", slug: "tumbuh-kembang" },
    { name: "Kesehatan Mental", slug: "mental-health" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  const categories = [
    {
      name: "Kesehatan Anak",
      slug: "kesehatan-anak",
    },
    {
      name: "Kesehatan Ibu & Kehamilan",
      slug: "kesehatan-ibu-kehamilan",
    },
    {
      name: "Penyakit & Kondisi Medis",
      slug: "penyakit-kondisi-medis",
    },
    {
      name: "Obat & Pengobatan",
      slug: "obat-pengobatan",
    },
    {
      name: "Gaya Hidup Sehat",
      slug: "gaya-hidup-sehat",
    },
    {
      name: "Nutrisi & Makanan",
      slug: "nutrisi-makanan",
    },
    {
      name: "Kesehatan Mental",
      slug: "kesehatan-mental",
    },
  ];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  // permissions
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: p },
      update: {},
      create: { name: p },
    });
  }

  // roles
  const roles = ["ADMIN", "EDITOR", "STAFF_MEDIS", "PATIENT"];
  const roleMap: any = {};

  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r },
      update: {},
      create: { name: r },
    });

    roleMap[r] = role.id;
  }

  // assign permissions (simple: admin = all)
  const allPerms = await prisma.permission.findMany();

  for (const p of allPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap.ADMIN,
          permissionId: p.id,
        },
      },
      update: {},
      create: {
        roleId: roleMap.ADMIN,
        permissionId: p.id,
      },
    });
  }

  // user
  const password = await hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@hospital.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@hospital.com",
      password,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: roleMap.ADMIN,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: roleMap.ADMIN,
    },
  });

  const skills = [
    "Asuhan Keperawatan Pasien",
    "Tatalaksana Kegawatdaruratan Medis",
    "Interpretasi Elektrokardiogram (EKG)",
    "Pencitraan Kardiovaskular",
    "Pelayanan Kefarmasian Klinis",
    "Dispensing Obat dan Resep",
    "Operasional Radiologi Diagnostik",
    "Pemeriksaan CT-Scan",
    "Terapi Rehabilitasi Medik",
    "Administrasi Rekam Medis",
    "Monitoring Tanda Vital Pasien",
    "Manajemen Keperawatan Intensif",
  ];

  console.log("📦 Seeding Skills...");

  await Promise.all(
    skills.map((name) =>
      prisma.skill.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const skillRecords = await prisma.skill.findMany();

  const getSkillId = (name: string) =>
    skillRecords.find((s) => s.name === name)?.id;

  const jobs = [
    {
      id: "job_001",
      title: "Dokter Spesialis Jantung",
      slug: "dokter-spesialis-jantung",
      shortDescription:
        "Penanganan komprehensif penyakit jantung dan kardiovaskular.",
      description:
        "Melakukan diagnosis, terapi, dan tindakan medis pada pasien dengan gangguan kardiovaskular.",

      locationCity: "Jakarta",
      locationCountry: "Indonesia",

      departement: "Kardiologi",

      employmentType: "FULL_TIME",
      workplaceType: "ONSITE",
      experienceLevel: "SENIOR",

      salaryMin: 30000000,
      salaryMax: 60000000,
      currency: "IDR",

      educationLevel: "DOCTORATE",

      priority: "FEATURED",
      isUrgent: true,
      urgentReason: "Kebutuhan dokter spesialis meningkat",

      postedAt: new Date("2026-05-20"),
      deadline: new Date("2026-07-01"),

      benefits: [
        "BPJS Kesehatan & Ketenagakerjaan",
        "Asuransi kesehatan keluarga",
        "Bonus kinerja tahunan",
        "Tunjangan profesi dokter",
        "Medical check-up gratis",
      ],

      requirements: [
        "Pendidikan Spesialis Jantung",
        "Memiliki STR aktif",
        "Pengalaman minimal 5 tahun",
        "Mampu bekerja dalam tim multidisiplin",
        "Komunikatif dan profesional",
      ],
    },

    {
      id: "job_002",
      title: "Perawat Rawat Inap",
      slug: "perawat-rawat-inap",
      shortDescription:
        "Asuhan keperawatan pasien rawat inap secara profesional.",
      description:
        "Memberikan pelayanan keperawatan, monitoring kondisi pasien, dan kolaborasi medis.",

      locationCity: "Bandung",
      locationCountry: "Indonesia",

      departement: "Keperawatan",

      employmentType: "FULL_TIME",
      workplaceType: "ONSITE",
      experienceLevel: "MID",

      salaryMin: 5000000,
      salaryMax: 9000000,
      currency: "IDR",

      educationLevel: "BACHELOR",

      priority: "NORMAL",
      isUrgent: false,

      postedAt: new Date("2026-05-18"),
      deadline: new Date("2026-06-30"),

      benefits: [
        "Tunjangan shift malam",
        "Mess karyawan",
        "Pelatihan BTCLS",
        "Makan selama shift",
        "BPJS lengkap",
      ],

      requirements: [
        "Minimal S1 Keperawatan",
        "Memiliki STR aktif",
        "Mampu bekerja shift",
        "Memiliki empati tinggi",
        "Mampu melakukan tindakan keperawatan dasar",
      ],
    },

    {
      id: "job_003",
      title: "Apoteker Klinik",
      slug: "apoteker-klinik",
      shortDescription: "Pelayanan kefarmasian klinis dan pengelolaan obat.",
      description:
        "Mengelola resep, dispensing obat, serta edukasi pasien terkait penggunaan obat.",

      locationCity: "Surabaya",
      locationCountry: "Indonesia",

      departement: "Farmasi",

      employmentType: "CONTRACT",
      workplaceType: "HYBRID",
      experienceLevel: "MID",

      salaryMin: 7000000,
      salaryMax: 12000000,
      currency: "IDR",

      educationLevel: "BACHELOR",

      priority: "URGENT",
      isUrgent: true,
      urgentReason: "Kebutuhan tenaga farmasi meningkat",

      postedAt: new Date("2026-05-25"),
      deadline: new Date("2026-06-20"),

      benefits: [
        "Insentif kinerja",
        "Training kefarmasian",
        "Asuransi kesehatan",
        "Bonus tahunan",
        "Jenjang karier",
      ],

      requirements: [
        "Profesi Apoteker",
        "Memiliki STRA aktif",
        "Menguasai dispensing obat",
        "Teliti dan detail",
        "Mampu bekerja dalam tekanan",
      ],
    },
  ];

  console.log("📦 Seeding Jobs...");

  for (const job of jobs) {
    const { benefits, requirements, ...jobData } = job;

    await prisma.job.upsert({
      where: { slug: job.slug },

      update: {
        ...jobData,

        benefits: {
          deleteMany: {},
          create: benefits.map((value) => ({
            value,
          })),
        },

        requirements: {
          deleteMany: {},
          create: requirements.map((value) => ({
            value,
          })),
        },
      },

      create: {
        ...jobData,

        benefits: {
          create: benefits.map((value) => ({
            value,
          })),
        },

        requirements: {
          create: requirements.map((value) => ({
            value,
          })),
        },
      },
    });
  }

  console.log("🔗 Seeding Job Skills...");

  await prisma.jobSkill.deleteMany();

  const jobSkillData = [
    {
      jobId: "job_001",
      skills: [
        "Tatalaksana Kegawatdaruratan Medis",
        "Interpretasi Elektrokardiogram (EKG)",
        "Pencitraan Kardiovaskular",
      ],
    },

    {
      jobId: "job_002",
      skills: [
        "Asuhan Keperawatan Pasien",
        "Monitoring Tanda Vital Pasien",
        "Administrasi Rekam Medis",
      ],
    },

    {
      jobId: "job_003",
      skills: ["Pelayanan Kefarmasian Klinis", "Dispensing Obat dan Resep"],
    },
  ];

  await prisma.jobSkill.createMany({
    data: jobSkillData.flatMap((job) =>
      job.skills.map((skillName) => ({
        jobId: job.jobId,
        skillId: getSkillId(skillName)!,
      })),
    ),
  });
}

main().finally(() => prisma.$disconnect());
