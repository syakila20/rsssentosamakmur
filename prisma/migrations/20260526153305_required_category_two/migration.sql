/*
  Warnings:

  - Made the column `categoryId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Article] DROP CONSTRAINT [Article_categoryId_fkey];

-- DropIndex
DROP INDEX [Article_categoryId_idx] ON [dbo].[Article];

-- AlterTable
ALTER TABLE [dbo].[Article] ALTER COLUMN [categoryId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Article] ADD CONSTRAINT [Article_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
