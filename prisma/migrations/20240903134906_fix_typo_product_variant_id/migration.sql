/*
  Warnings:

  - You are about to drop the column `productVarianId` on the `QRCode` table. All the data in the column will be lost.
  - Added the required column `productVariantId` to the `QRCode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QRCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productHanle" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "scans" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_QRCode" ("createdAt", "destination", "id", "productHanle", "productId", "scans", "shop", "title") SELECT "createdAt", "destination", "id", "productHanle", "productId", "scans", "shop", "title" FROM "QRCode";
DROP TABLE "QRCode";
ALTER TABLE "new_QRCode" RENAME TO "QRCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
