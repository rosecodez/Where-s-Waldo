-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "waldoPosition" JSONB NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
