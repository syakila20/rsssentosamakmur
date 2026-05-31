BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [slug] NVARCHAR(1000) NOT NULL,
    [shortDescription] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [locationCity] NVARCHAR(1000) NOT NULL,
    [locationCountry] NVARCHAR(1000) NOT NULL,
    [employmentType] NVARCHAR(1000) NOT NULL,
    [workplaceType] NVARCHAR(1000) NOT NULL,
    [experienceLevel] NVARCHAR(1000) NOT NULL,
    [salaryMin] INT,
    [salaryMax] INT,
    [currency] NVARCHAR(1000),
    [educationLevel] NVARCHAR(1000) NOT NULL,
    [priority] NVARCHAR(1000) NOT NULL,
    [isUrgent] BIT NOT NULL CONSTRAINT [Job_isUrgent_df] DEFAULT 0,
    [postedAt] DATETIME2 NOT NULL CONSTRAINT [Job_postedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [deadline] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Job_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Job_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Skill] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Skill_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Skill_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[JobSkill] (
    [jobId] NVARCHAR(1000) NOT NULL,
    [skillId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [JobSkill_pkey] PRIMARY KEY CLUSTERED ([jobId],[skillId])
);

-- CreateTable
CREATE TABLE [dbo].[Applicant] (
    [id] NVARCHAR(1000) NOT NULL,
    [jobId] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [resumeUrl] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Applicant_status_df] DEFAULT 'PENDING',
    [appliedAt] DATETIME2 NOT NULL CONSTRAINT [Applicant_appliedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Applicant_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Job_slug_idx] ON [dbo].[Job]([slug]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Job_locationCity_idx] ON [dbo].[Job]([locationCity]);

-- AddForeignKey
ALTER TABLE [dbo].[JobSkill] ADD CONSTRAINT [JobSkill_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobSkill] ADD CONSTRAINT [JobSkill_skillId_fkey] FOREIGN KEY ([skillId]) REFERENCES [dbo].[Skill]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Applicant] ADD CONSTRAINT [Applicant_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
