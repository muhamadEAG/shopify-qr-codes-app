/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type SupplementQrCodeQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type SupplementQrCodeQuery = { product?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'title'>
    & { images: { nodes: Array<Pick<AdminTypes.Image, 'altText' | 'url'>> } }
  )> };

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

export type ShopifyRemixTemplateUpdateVariantMutationVariables = AdminTypes.Exact<{
  productId: AdminTypes.Scalars['ID']['input'];
  variants: Array<AdminTypes.ProductVariantsBulkInput> | AdminTypes.ProductVariantsBulkInput;
}>;


export type ShopifyRemixTemplateUpdateVariantMutation = { productVariantsBulkUpdate?: AdminTypes.Maybe<{ productVariants?: AdminTypes.Maybe<Array<Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'>>> }> };

interface GeneratedQueryTypes {
  "\n      query supplementQRCode($id: ID!) {\n        product(id: $id) {\n          title\n          images(first: 1) {\n            nodes {\n              altText\n              url\n            }\n          }\n        }\n      }\n    ": {return: SupplementQRCodeQuery, variables: SupplementQRCodeQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n      mutation populateProduct($input: ProductInput!) {\n        productCreate(input: $input) {\n          product {\n            id\n            title\n            handle\n            status\n            variants(first: 10) {\n              edges {\n                node {\n                  id\n                  price\n                  barcode\n                  createdAt\n                }\n              }\n            }\n          }\n        }\n      }": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
  "#graphql\n    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {\n      productVariantsBulkUpdate(productId: $productId, variants: $variants) {\n        productVariants {\n          id\n          price\n          barcode\n          createdAt\n        }\n      }\n    }": {return: ShopifyRemixTemplateUpdateVariantMutation, variables: ShopifyRemixTemplateUpdateVariantMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
