import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  InlineStack,
  EmptyState,
  IndexTable,
  Thumbnail,
  Icon,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getQRCodes } from "~/models/QRCode.server";
import type { GeneratedQRCode } from "~/types/QRCode";
import { AlertDiamondIcon, ImageIcon } from "@shopify/polaris-icons";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const qrCodes = await getQRCodes(session.shop, admin.graphql);

  return json({
    qrCodes,
  });
};

const EmptyQRCodeState = ({ onAction }: { onAction: () => void }) => (
  <EmptyState
    heading="Create unique QR codes for your product"
    action={{ content: "Create QR code", onAction }}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Allow customers to scan codes and buy products using their phones.</p>
  </EmptyState>
);

function truncate(str: string, { length = 25 } = {}) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

const QRTable = ({ qrCodes }: { qrCodes: GeneratedQRCode[] }) => (
  <IndexTable
    resourceName={{
      singular: "QR code",
      plural: "QR codes",
    }}
    itemCount={qrCodes.length}
    headings={[
      {
        title: "Thumbnail",
        hidden: true,
      },
      {
        title: "Title",
      },
      { title: "Product" },
      { title: "Date created" },
      { title: "Scans" },
    ]}
    selectable={false}
  >
    {qrCodes.map((qrCode) => (
      <QRTableRow key={qrCode.id} qrCode={qrCode} />
    ))}
  </IndexTable>
);

const QRTableRow = ({ qrCode }: { qrCode: GeneratedQRCode }) => (
  <IndexTable.Row id={String(qrCode.id)} position={qrCode.id}>
    <IndexTable.Cell>
      <Thumbnail
        source={qrCode.productImage || ImageIcon}
        alt={qrCode.productTitle}
        size="small"
      />
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Link to={`qrcodes/${qrCode.id}`}>{truncate(qrCode.title)}</Link>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {qrCode.productDeleted ? (
        <InlineStack align="start" gap="200">
          <span style={{ width: "20px" }}>
            <Icon source={AlertDiamondIcon} tone="critical" />
          </span>
          <Text tone="critical" as="span">
            product has been deleted
          </Text>
        </InlineStack>
      ) : (
        truncate(qrCode.productTitle)
      )}
    </IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(qrCode.createdAt).toDateString()}
    </IndexTable.Cell>
    <IndexTable.Cell>{qrCode.scans}</IndexTable.Cell>
  </IndexTable.Row>
);

export default function Index() {
  const { qrCodes } = useLoaderData<{ qrCodes: GeneratedQRCode[] }>();
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar title="QR codes">
        <button variant="primary" onClick={() => navigate("/app/qrcodes/new")}>
          Generate a product
        </button>
      </TitleBar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {qrCodes.length === 0 ? (
              <EmptyQRCodeState onAction={() => navigate("qrcodes/new")} />
            ) : (
              <QRTable qrCodes={qrCodes} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
