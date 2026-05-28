/*
  Warnings:

  - You are about to drop the column `category` on the `Article` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [Article_authorId_idx] ON [dbo].[Article];

-- AlterTable
ALTER TABLE [dbo].[Article] DROP COLUMN [category];
ALTER TABLE [dbo].[Article] ADD [categoryId] INT;

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [slug] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Category_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Category_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[ArticleTag] (
    [articleId] INT NOT NULL,
    [tagId] INT NOT NULL,
    CONSTRAINT [ArticleTag_pkey] PRIMARY KEY CLUSTERED ([articleId],[tagId])
);

-- CreateTable
CREATE TABLE [dbo].[Tag] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [slug] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Tag_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Tag_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Article_categoryId_idx] ON [dbo].[Article]([categoryId]);

-- AddForeignKey
ALTER TABLE [dbo].[ArticleTag] ADD CONSTRAINT [ArticleTag_articleId_fkey] FOREIGN KEY ([articleId]) REFERENCES [dbo].[Article]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ArticleTag] ADD CONSTRAINT [ArticleTag_tagId_fkey] FOREIGN KEY ([tagId]) REFERENCES [dbo].[Tag]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Article] ADD CONSTRAINT [Article_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
