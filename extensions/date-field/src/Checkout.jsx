import {
  reactExtension,
  BlockStack,
  Text,
  useApplyMetafieldsChange,
  useBuyerJourneyIntercept,
  Heading,
  DateField,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';
import React, { useState } from 'react';

export default reactExtension(
  'purchase.checkout.actions.render-before',
  () => <Extension />,
);

function Extension() {
  const { heading_text } = useSettings();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const applyMetafieldsChange = useApplyMetafieldsChange();

  useBuyerJourneyIntercept(() => {
    if (!selectedDate) {
      setDateError("Please select a valid date.");
      return {
        behavior: "block",
        reason: "Please select a valid date.",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      setDateError("The selected date cannot be in the past.");
      return {
        behavior: "block",
        reason: "The selected date cannot be in the past.",
      };
    }

    setDateError(false);
    return {
      behavior: "allow",
      perform: () => {
        setDateError(false);
      },
    };
  }); 

  const handleDateChange = (value) => {
    if (!value) {
      setSelectedDate(null);
      setDateError("Please select a valid date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(value);
    selected.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setSelectedDate(value);
      setDateError(false);

      applyMetafieldsChange({
        type: "updateMetafield",
        namespace: "custom",
        key: "trip_date",
        valueType: "string",
        value: value,
      });
    } else {
      setSelectedDate(null);
      setDateError("The selected date cannot be in the past.");
    }
  };

  return (
    <BlockStack padding={["none", "none", "loose", "none"]}>
      <Heading level={3}>{heading_text}</Heading>
      <DateField
        label={heading_text}
        name="trip-date"
        value={selectedDate || undefined}
        onChange={handleDateChange}
      />
      {dateError && (
        <Text size="small" appearance="critical">
          {dateError}
        </Text>
      )}
    </BlockStack>
  );
}
