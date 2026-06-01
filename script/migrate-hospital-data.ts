import { PrismaClient } from "@prisma/client";

const local = new PrismaClient({
  datasources: { db: { url: process.env.LOCAL_DATABASE_URL! } },
});

const azure = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL! } },
});

async function main() {
  console.log("🚀 ARTICLE MIGRATION FIXED (ID SAFE MODE)");

  // =========================
  // 1. USER (MUST FIRST)
  // =========================
  const users = await local.user.findMany();

  const userMap = new Map<number, number>();

  for (const user of users) {
    const created = await azure.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        isActive: user.isActive,
      },
    });

    // mapping OLD ID → NEW ID
    userMap.set(user.id, created.id);
  }

  // =========================
  // 2. CATEGORY
  // =========================
  const categories = await local.category.findMany();

  const categoryMap = new Map<number, number>();

  for (const cat of categories) {
    const created = await azure.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
      },
    });

    categoryMap.set(cat.id, created.id);
  }

  // =========================
  // 3. ARTICLE (FIX FK MAPPING)
  // =========================
  const articles = await local.article.findMany();

  for (const article of articles) {
    await azure.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        thumbnail: article.thumbnail,
        published: article.published,
        publishedAt: article.publishedAt,
        views: article.views,

        categoryId: categoryMap.get(article.categoryId)!,
        authorId: userMap.get(article.authorId)!,
      },
    });
  }

  console.log("✅ ARTICLE MIGRATION SUCCESS (FK SAFE + MAPPED)");
}

main()
  .catch(console.error)
  .finally(async () => {
    await local.$disconnect();
    await azure.$disconnect();
  });
