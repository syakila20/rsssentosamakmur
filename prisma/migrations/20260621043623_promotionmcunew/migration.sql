/*
  Warnings:

  - You are about to alter the column `image` on the `Promo` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `NVarChar(500)`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `gender` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Article] ADD [contentJson] NVARCHAR(max),
[reviewerName] NVARCHAR(255),
[status] NVARCHAR(50) NOT NULL CONSTRAINT [Article_status_df] DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE [dbo].[Promo] ALTER COLUMN [image] NVARCHAR(500) NULL;
ALTER TABLE [dbo].[Promo] ADD [bannerImage] NVARCHAR(500),
[categoryId] INT,
[discountPercent] INT,
[gender] NVARCHAR(255) NOT NULL,
[isFeatured] BIT NOT NULL CONSTRAINT [Promo_isFeatured_df] DEFAULT 0,
[maxAge] INT,
[minAge] INT,
[originalPrice] DECIMAL(18,2),
[patientRecommendation] NVARCHAR(255),
[preparation] NVARCHAR(max),
[promoPrice] DECIMAL(18,2),
[shortDescription] NVARCHAR(500),
[termsCondition] NVARCHAR(max);

-- CreateTable
CREATE TABLE [dbo].[ArticleRevision] (
    [id] INT NOT NULL IDENTITY(1,1),
    [articleId] INT NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [contentJson] NVARCHAR(max) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ArticleRevision_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ArticleRevision_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PromoCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [slug] NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(500),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PromoCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PromoCategory_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PromoCategory_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [PromoCategory_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[PromoBenefit] (
    [id] INT NOT NULL IDENTITY(1,1),
    [promoId] INT NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max),
    [sortOrder] INT NOT NULL CONSTRAINT [PromoBenefit_sortOrder_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PromoBenefit_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PromoBenefit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PromoGallery] (
    [id] INT NOT NULL IDENTITY(1,1),
    [promoId] INT NOT NULL,
    [image] NVARCHAR(500) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [PromoGallery_sortOrder_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PromoGallery_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PromoGallery_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PromoTag] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [slug] NVARCHAR(100) NOT NULL,
    CONSTRAINT [PromoTag_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PromoTag_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [PromoTag_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[PromoTagMapping] (
    [promoId] INT NOT NULL,
    [tagId] INT NOT NULL,
    CONSTRAINT [PromoTagMapping_pkey] PRIMARY KEY CLUSTERED ([promoId],[tagId])
);

-- CreateTable
CREATE TABLE [dbo].[LoginOtp] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [codeHash] NVARCHAR(255) NOT NULL,
    [expiresAt] DATETIME2 NOT NULL,
    [usedAt] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [LoginOtp_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT,
    CONSTRAINT [LoginOtp_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RateLimit] (
    [id] NVARCHAR(1000) NOT NULL,
    [ip] NVARCHAR(1000) NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RateLimit_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [RateLimit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[Session] DROP CONSTRAINT [Session_sessionToken_key];
DROP INDEX [Session_userId_idx] ON [dbo].[Session];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Session'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [expires] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Session_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);
IF EXISTS(SELECT * FROM [dbo].[Session])
    EXEC('INSERT INTO [dbo].[_prisma_new_Session] ([expires],[id],[sessionToken],[userId]) SELECT [expires],[id],[sessionToken],[userId] FROM [dbo].[Session] WITH (holdlock tablockx)');
DROP TABLE [dbo].[Session];
EXEC SP_RENAME N'dbo._prisma_new_Session', N'Session';
CREATE NONCLUSTERED INDEX [Session_userId_idx] ON [dbo].[Session]([userId]);
COMMIT;

-- CreateIndex
CREATE NONCLUSTERED INDEX [ArticleRevision_articleId_idx] ON [dbo].[ArticleRevision]([articleId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PromoBenefit_promoId_idx] ON [dbo].[PromoBenefit]([promoId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PromoGallery_promoId_idx] ON [dbo].[PromoGallery]([promoId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [LoginOtp_email_idx] ON [dbo].[LoginOtp]([email]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [RateLimit_ip_idx] ON [dbo].[RateLimit]([ip]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Promo_slug_idx] ON [dbo].[Promo]([slug]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Promo_isActive_idx] ON [dbo].[Promo]([isActive]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Promo_startDate_idx] ON [dbo].[Promo]([startDate]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Promo_endDate_idx] ON [dbo].[Promo]([endDate]);

-- AddForeignKey
ALTER TABLE [dbo].[ArticleRevision] ADD CONSTRAINT [ArticleRevision_articleId_fkey] FOREIGN KEY ([articleId]) REFERENCES [dbo].[Article]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Promo] ADD CONSTRAINT [Promo_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[PromoCategory]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PromoBenefit] ADD CONSTRAINT [PromoBenefit_promoId_fkey] FOREIGN KEY ([promoId]) REFERENCES [dbo].[Promo]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PromoGallery] ADD CONSTRAINT [PromoGallery_promoId_fkey] FOREIGN KEY ([promoId]) REFERENCES [dbo].[Promo]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PromoTagMapping] ADD CONSTRAINT [PromoTagMapping_promoId_fkey] FOREIGN KEY ([promoId]) REFERENCES [dbo].[Promo]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PromoTagMapping] ADD CONSTRAINT [PromoTagMapping_tagId_fkey] FOREIGN KEY ([tagId]) REFERENCES [dbo].[PromoTag]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LoginOtp] ADD CONSTRAINT [LoginOtp_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
