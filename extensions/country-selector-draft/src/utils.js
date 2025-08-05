export async function updateCountries(orderId, newCountries) {
    // This function updates the metafield for the countries list associated with an order
    return await makeGraphQLQuery(
        `mutation SetMetafield($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
                metafields {
                    key
                    value
                }
                userErrors {
                    field
                    message
                    code
                }
            }
        }`,
        {
            metafields: [
                {
                    ownerId: orderId,
                    namespace: "custom",
                    key: "glasses_country",
                    type: "list.single_line_text_field",
                    value: JSON.stringify(newCountries),
                }
            ]
        }
    );
}

export async function fetchCountries(orderId) {
    // This function fetches the metafield for the countries list associated with an order
    return await makeGraphQLQuery(
        `query GetMetafield($id: ID!) {
            draftOrder(id: $id) {
                metafield(namespace: "custom", key: "glasses_country") {
                    type
                    jsonValue
                }
            }
        }`,
        { id: orderId }
    );
}


async function makeGraphQLQuery(query, variables) {
    const graphQLQuery = {
        query,
        variables,
    };

    const res = await fetch("shopify:admin/api/graphql.json", {
        method: "POST",
        body: JSON.stringify(graphQLQuery),
    });

    if (!res.ok) {
        console.error("Network error");
    }

    return await res.json();
}
