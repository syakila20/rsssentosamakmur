BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [ArticleView_createdAt_idx] ON [dbo].[ArticleView];

-- AlterTable
ALTER TABLE [dbo].[ArticleView] ADD [sessionId] NVARCHAR(1000);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ArticleView_sessionId_idx] ON [dbo].[ArticleView]([sessionId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
