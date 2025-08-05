export async function makeGraphQLQuery(query, variables) {
  const res = await fetch('shopify:admin/api/graphql.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL errors');
  }
  return json;
}

export async function fetchBundleMetaobject(productId, metafieldKey) {
  const query = `
    query GetProductBundle($id: ID!, $key: String!) {
      product(id: $id) {
        metafield(namespace: "custom", key: $key) {
          reference {
            ... on Metaobject {
              id
              fields {
                key
                value
                reference { ... on ProductVariant { id } }
              }
            }
          }
        }
      }
    }
  `;
  const res = await makeGraphQLQuery(query, { id: productId, key: metafieldKey });
  const reference = res.data.product.metafield?.reference;
  if (!reference || !reference.fields) return { bundleEntries: [], metaobjectId: null };

  // fields come back in pairs [product_variant, quantity]
  const fields = reference.fields;
  const bundleEntries = [];
  for (let i = 0; i < fields.length; i += 2) {
    const varField = fields[i];
    const qtyField = fields[i + 1];
    if (varField.key === 'product_variant' && qtyField.key === 'quantity') {
      bundleEntries.push({
        productVariantId: varField.reference.id,
        quantity: parseInt(qtyField.value, 10),
      });
    }
  }

  return { bundleEntries, metaobjectId: reference.id };
}

export async function createBundleMetaobject(entries) {
  const mutation = `
    mutation CreateBundle($input: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $input) {
        metaobject { id }
        userErrors { field message }
      }
    }
  `;
  const fields = entries.flatMap(e => [
    {
      key: 'product_variant',
      type: 'product_variant_reference',
      references: [e.productVariantId],
    },
    {
      key: 'quantity',
      type: 'number_integer',
      value: e.quantity.toString(),
    },
  ]);
  const { data } = await makeGraphQLQuery(mutation, {
    input: { type: 'bundles', fields },
  });
  return data.metaobjectCreate.metaobject.id;
}

export async function updateBundleMetaobject(metaobjectId, entries) {
  const mutation = `
    mutation UpdateBundle($id: ID!, $fields: [MetaobjectFieldInput!]!) {
      metaobjectUpdate(id: $id, fields: $fields) {
        metaobject { id }
        userErrors { field message }
      }
    }
  `;
  const fields = entries.flatMap(e => [
    {
      key: 'product_variant',
      type: 'product_variant_reference',
      references: [e.productVariantId],
    },
    {
      key: 'quantity',
      type: 'number_integer',
      value: e.quantity.toString(),
    },
  ]);
  await makeGraphQLQuery(mutation, { id: metaobjectId, fields });
}

export async function attachMetaobjectToProduct(productId, metafieldKey, metaobjectId) {
  const mutation = `
    mutation AttachMetaobject($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { key value }
        userErrors { field message }
      }
    }
  `;
  await makeGraphQLQuery(mutation, {
    metafields: [
      {
        ownerId: productId,
        namespace: 'custom',
        key: metafieldKey,
        type: 'metaobject_reference',
        reference: { id: metaobjectId },
      },
    ],
  });
}

export async function updateProductPrice(productId, bundleItems, primaryVariantId) {
  // 1) Fetch each variant’s price
  const ids = bundleItems.map(i => i.productVariantId);
  const priceQuery = `
    query GetVariantPrices($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant { id price { amount } }
      }
    }
  `;
  const resPrices = await makeGraphQLQuery(priceQuery, { ids });
  const nodes = resPrices.data.nodes;

  // 2) Calculate total
  let total = 0;
  bundleItems.forEach(item => {
    const node = nodes.find(n => n.id === item.productVariantId);
    const unit = parseFloat(node?.price?.amount || 0);
    total += unit * item.quantity;
  });
  total = Math.round(total * 100) / 100;

  // 3) Update the *primary* variant’s price
  const mutation = `
    mutation UpdateVariant($input: ProductVariantInput!) {
      productVariantUpdate(input: $input) {
        productVariant { id price { amount } }
        userErrors { field message }
      }
    }
  `;
  await makeGraphQLQuery(mutation, {
    input: { id: primaryVariantId, price: total.toString() },
  });
}
