import {
  reactExtension,
  useApi,
  AdminBlock,
  BlockStack,
  Text,
  Button,
  Divider,
  InlineStack,
  TextField,
  Banner,
  Heading,
  Badge,
  Link,
  ProgressIndicator,
  Box,
} from '@shopify/ui-extensions-react/admin';
import { useState, useEffect } from 'react';
import { useBundleManager } from './hooks/useBundleManager';
import { updateProductPrice } from './utils';

const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const { data } = useApi(TARGET);
  const productId = data?.product?.id;
  const variants = data?.product?.variants || [];
  const primaryVariantId = variants[0]?.id;

  const { bundleData, setBundleData, loading, error } =
    useBundleManager(productId, 'bundle', data?.refresh);

  const [localData, setLocalData] = useState([]);
  const [updating, setUpdating] = useState(false);

  // sync hook → local
  useEffect(() => {
    setLocalData(bundleData);
  }, [bundleData]);

  const handleChange = (i, field, val) => {
    const arr = [...localData];
    arr[i] = { ...arr[i], [field]: field === 'quantity' ? parseInt(val,10) || 0 : val };
    setLocalData(arr);
  };

  const handleRemove = (i) => {
    setLocalData(localData.filter((_, idx) => idx !== i));
  };

  const handleAdd = () => {
    setLocalData([...localData, { productVariantId: '', quantity: 1 }]);
  };

  const handleSave = async () => {
    setUpdating(true);
    await setBundleData(localData);
    if (primaryVariantId) {
      await updateProductPrice(productId, localData, primaryVariantId);
    }
    setUpdating(false);
  };

  function smartChunk(array) {
    const chunks = [];
    let currentChunk = [];
    let currentWidth = 0;
    array.forEach((item) => {
      const itemWidth = (item.productVariantId?.length || 0) > 8 ? 0.5 : 0.25;
      if (currentWidth + itemWidth > 1) {
        chunks.push(currentChunk);
        currentChunk = [item];
        currentWidth = itemWidth;
      } else {
        currentChunk.push(item);
        currentWidth += itemWidth;
      }
    });
    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
    }
    return chunks;
  }

  return (
    <AdminBlock title="Bundle Builder" loading={loading}>
      <BlockStack spacing="loose" blockGap="base">
        {error && <Banner status="critical">{error}</Banner>}
        {localData.length === 0 && <Heading size={5}>No bundle items added</Heading>}
        {localData.length > 0 && <Heading size={5}>Bundle Items</Heading>}
        <BlockStack gap="base">
          {smartChunk(localData).map((row, rowIndex) => (
            <InlineStack key={rowIndex} gap="base" blockAlignment="center" wrap={true}>
              {row.map((item, i) => (
                <Link
                  key={item.productVariantId + i}
                  onPress={() => handleRemove(localData.indexOf(item))}
                  variant="tertiary"
                >
                  <Badge icon={"CancelMajor"} iconPosition='end'>
                    {item.productVariantId} x{item.quantity}
                  </Badge>
                </Link>
              ))}
            </InlineStack>
          ))}
        </BlockStack>
        <Divider />
        <InlineStack gap="base">
          <Button onPress={handleAdd}>Add Variant</Button>
          <Button onPress={handleSave} disabled={updating}>
            {updating ? <ProgressIndicator size="small-300" /> : 'Save & Update Price'}
          </Button>
        </InlineStack>
      </BlockStack>
    </AdminBlock>
  );
}
