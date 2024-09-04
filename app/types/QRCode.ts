import type { QRCode } from "@prisma/client";

export type GeneratedQRCode = Omit<QRCode, "createdAt"> & {
  createdAt: string;
  productTitle: string;
  productAlt: string;
  productImage: string;
  destinationUrl: string;
  image: string;
  productDeleted: boolean;
};
