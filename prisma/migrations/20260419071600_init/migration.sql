BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(255),
    [avatar] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [User_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Role_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Role_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(150) NOT NULL,
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Permission_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [userId] INT NOT NULL,
    [roleId] INT NOT NULL,
    CONSTRAINT [UserRole_pkey] PRIMARY KEY CLUSTERED ([userId],[roleId])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermission] (
    [roleId] INT NOT NULL,
    [permissionId] INT NOT NULL,
    CONSTRAINT [RolePermission_pkey] PRIMARY KEY CLUSTERED ([roleId],[permissionId])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [type] NVARCHAR(50) NOT NULL,
    [provider] NVARCHAR(50) NOT NULL,
    [providerAccountId] NVARCHAR(255) NOT NULL,
    [refresh_token] NVARCHAR(max),
    [access_token] NVARCHAR(max),
    [token_type] NVARCHAR(50),
    [scope] NVARCHAR(255),
    [id_token] NVARCHAR(max),
    [session_state] NVARCHAR(255),
    [expires_at] INT,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_providerAccountId_key] UNIQUE NONCLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sessionToken] NVARCHAR(255) NOT NULL,
    [userId] INT NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [identifier] NVARCHAR(255) NOT NULL,
    [token] NVARCHAR(255) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_pkey] PRIMARY KEY CLUSTERED ([identifier],[token])
);

-- CreateTable
CREATE TABLE [dbo].[Specialty] (
    [id] INT NOT NULL IDENTITY(1,1),
    [label] NVARCHAR(255) NOT NULL,
    [en] NVARCHAR(255) NOT NULL,
    [slug] NVARCHAR(255) NOT NULL,
    [code] NVARCHAR(100) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Specialty_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Specialty_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Specialty_slug_key] UNIQUE NONCLUSTERED ([slug]),
    CONSTRAINT [Specialty_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[Doctor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(255) NOT NULL,
    [slug] NVARCHAR(255) NOT NULL,
    [location] NVARCHAR(255) NOT NULL,
    [bio] NVARCHAR(max),
    [experience] NVARCHAR(255) NOT NULL,
    [price] INT,
    [isOnline] BIT NOT NULL CONSTRAINT [Doctor_isOnline_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Doctor_isActive_df] DEFAULT 1,
    [rating] FLOAT(53) NOT NULL CONSTRAINT [Doctor_rating_df] DEFAULT 0,
    [reviews] INT NOT NULL CONSTRAINT [Doctor_reviews_df] DEFAULT 0,
    [image] NVARCHAR(1000),
    [specialtyId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Doctor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Doctor_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Doctor_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Schedule] (
    [id] INT NOT NULL IDENTITY(1,1),
    [day] INT NOT NULL,
    [startTime] INT NOT NULL,
    [endTime] INT NOT NULL,
    [doctorId] INT NOT NULL,
    CONSTRAINT [Schedule_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Education] (
    [id] INT NOT NULL IDENTITY(1,1),
    [degree] NVARCHAR(255) NOT NULL,
    [university] NVARCHAR(255) NOT NULL,
    [doctorId] INT NOT NULL,
    CONSTRAINT [Education_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DoctorExperience] (
    [id] INT NOT NULL IDENTITY(1,1),
    [startYear] INT NOT NULL,
    [endYear] INT,
    [title] NVARCHAR(255) NOT NULL,
    [place] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [doctorId] INT NOT NULL,
    CONSTRAINT [DoctorExperience_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Article] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [slug] NVARCHAR(255) NOT NULL,
    [excerpt] NVARCHAR(max) NOT NULL,
    [content] NVARCHAR(max) NOT NULL,
    [thumbnail] NVARCHAR(1000),
    [category] NVARCHAR(100) NOT NULL,
    [published] BIT NOT NULL CONSTRAINT [Article_published_df] DEFAULT 0,
    [publishedAt] DATETIME2,
    [authorId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Article_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Article_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Article_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Promo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [slug] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [image] NVARCHAR(1000),
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [Promo_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Promo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Promo_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Promo_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[HospitalProfile] (
    [id] INT NOT NULL CONSTRAINT [HospitalProfile_id_df] DEFAULT 1,
    [name] NVARCHAR(255) NOT NULL,
    [address] NVARCHAR(500) NOT NULL,
    [phone] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [logo] NVARCHAR(1000),
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [HospitalProfile_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserTest] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserTest_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserTest_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Account_userId_idx] ON [dbo].[Account]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Session_userId_idx] ON [dbo].[Session]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Doctor_specialtyId_idx] ON [dbo].[Doctor]([specialtyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Doctor_slug_idx] ON [dbo].[Doctor]([slug]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Doctor_isActive_idx] ON [dbo].[Doctor]([isActive]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Schedule_doctorId_idx] ON [dbo].[Schedule]([doctorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Schedule_day_idx] ON [dbo].[Schedule]([day]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Education_doctorId_idx] ON [dbo].[Education]([doctorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [DoctorExperience_doctorId_idx] ON [dbo].[DoctorExperience]([doctorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Article_authorId_idx] ON [dbo].[Article]([authorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Article_published_idx] ON [dbo].[Article]([published]);

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [UserRole_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [UserRole_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [Doctor_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Schedule] ADD CONSTRAINT [Schedule_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[Doctor]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Education] ADD CONSTRAINT [Education_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[Doctor]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DoctorExperience] ADD CONSTRAINT [DoctorExperience_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[Doctor]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Article] ADD CONSTRAINT [Article_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
