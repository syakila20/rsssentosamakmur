BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Article] ADD [views] INT NOT NULL CONSTRAINT [Article_views_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[ArticleView] (
    [id] INT NOT NULL IDENTITY(1,1),
    [articleId] INT NOT NULL,
    [ipAddress] NVARCHAR(1000),
    [userAgent] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ArticleView_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ArticleView_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ArticleView_articleId_idx] ON [dbo].[ArticleView]([articleId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ArticleView_createdAt_idx] ON [dbo].[ArticleView]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Article_views_idx] ON [dbo].[Article]([views]);

-- AddForeignKey
ALTER TABLE [dbo].[ArticleView] ADD CONSTRAINT [ArticleView_articleId_fkey] FOREIGN KEY ([articleId]) REFERENCES [dbo].[Article]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
