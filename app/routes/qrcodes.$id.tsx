import { json, type LoaderFunctionArgs } from "@remix-run/node";
import db from "../db.server";
import invariant from "tiny-invariant";
import { getQRCodeImage } from "~/models/QRCode.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Could not find QR code destination");

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code destination");

  return json({
    title: qrCode.title,
    image: await getQRCodeImage(id),
  });
};

type LoaderData = { title: string; image: string };

export default function QRCode() {
  const { image, title } = useLoaderData<LoaderData>();

  return (
    <>
      <h1>{title}</h1>
      <img src={image} alt="QR Code for product" />
    </>
  );
}