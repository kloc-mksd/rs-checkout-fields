import {
  AdminBlock,
  BlockStack,
  Button,
  InlineStack,
  Select,
  Text,
  Heading,
  Icon,
  Banner,
  Divider,
  reactExtension,
  useApi,
  Badge,
  Link,
  ProgressIndicator,
  Box,
} from '@shopify/ui-extensions-react/admin';
import { useCountriesManager } from './hooks/useCountriesManager';
import { useState } from 'react';
const TARGET = 'admin.draft-order-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const { data, refresh } = useApi(TARGET);
  const orderId = data?.selected?.[0]?.id;
  const [removingCountry, setRemovingCountry] = useState(null);

  const handleRemoveCountry = async (countryLabel) => {
    setRemovingCountry(countryLabel);
    await removeCountry(countryLabel);
    setRemovingCountry(null);
  };

  const allCountries = [
    { label: 'Albania', value: 'albania' },
    { label: 'Andorra', value: 'andorra' },
    { label: 'Angola', value: 'angola' },
    { label: 'Antigua & Barbuda', value: 'antigua-barbuda' },
    { label: 'Argentina', value: 'argentina' },
    { label: 'Armenia', value: 'armenia' },
    { label: 'Aruba', value: 'aruba' },
    { label: 'Australia', value: 'australia' },
    { label: 'Austria', value: 'austria' },
    { label: 'Azerbaijan', value: 'azerbaijan' },
    { label: 'Bahamas', value: 'bahamas' },
    { label: 'Bahrain', value: 'bahrain' },
    { label: 'Bangladesh', value: 'bangladesh' },
    { label: 'Barbados', value: 'barbados' },
    { label: 'Belarus', value: 'belarus' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Belize', value: 'belize' },
    { label: 'Benin', value: 'benin' },
    { label: 'Bhutan', value: 'bhutan' },
    { label: 'Bolivia', value: 'bolivia' },
    { label: 'Bosnia & Herzegovina', value: 'bosnia-herzegovina' },
    { label: 'Botswana', value: 'botswana' },
    { label: 'Brazil', value: 'brazil' },
    { label: 'Brunei', value: 'brunei' },
    { label: 'Bulgaria', value: 'bulgaria' },
    { label: 'Burkina Faso', value: 'burkina-faso' },
    { label: 'Burma', value: 'burma' },
    { label: 'Burundi', value: 'burundi' },
    { label: 'Cambodia', value: 'cambodia' },
    { label: 'Canada', value: 'canada' },
    { label: 'Cape Verde', value: 'cape-verde' },
    { label: 'Cayman Islands', value: 'cayman-islands' },
    { label: 'Central African Republic', value: 'central-african-republic' },
    { label: 'Chad', value: 'chad' },
    { label: 'Chile', value: 'chile' },
    { label: 'China', value: 'china' },
    { label: 'China (Including Hong Kong)', value: 'china-hk' },
    { label: 'Colombia', value: 'colombia' },
    { label: 'Comoros', value: 'comoros' },
    { label: 'Costa Rica', value: 'costa-rica' },
    { label: "Cote D'Ivoire", value: 'cote-divoire' },
    { label: 'Croatia', value: 'croatia' },
    { label: 'Czech Republic', value: 'czech-republic' },
    { label: 'Cameroon', value: 'cameroon' },
    { label: 'Democratic Republic of the Congo', value: 'democratic-republic-congo' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Djibouti', value: 'djibouti' },
    { label: 'Dominica', value: 'dominica' },
    { label: 'Dominican Republic', value: 'dominican-republic' },
    { label: 'East Timor', value: 'east-timor' },
    { label: 'Ecuador', value: 'ecuador' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'El Salvador', value: 'el-salvador' },
    { label: 'Equatorial Guinea', value: 'equatorial-guinea' },
    { label: 'Eritrea', value: 'eritrea' },
    { label: 'Estonia', value: 'estonia' },
    { label: 'Ethiopia', value: 'ethiopia' },
    { label: 'Fiji', value: 'fiji' },
    { label: 'Finland', value: 'finland' },
    { label: 'France', value: 'france' },
    { label: 'French Guiana', value: 'french-guiana' },
    { label: 'Fyr Macedonia', value: 'fyr-macedonia' },
    { label: 'Gabon', value: 'gabon' },
    { label: 'Gambia', value: 'gambia' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Germany', value: 'germany' },
    { label: 'Ghana', value: 'ghana' },
    { label: 'Greece', value: 'greece' },
    { label: 'Greenland', value: 'greenland' },
    { label: 'Grenada', value: 'grenada' },
    { label: 'Guatemala', value: 'guatemala' },
    { label: 'Guinea', value: 'guinea' },
    { label: 'Guinea Bissau', value: 'guinea-bissau' },
    { label: 'Guyana', value: 'guyana' },
    { label: 'Haiti', value: 'haiti' },
    { label: 'Holy See', value: 'holy-see' },
    { label: 'Honduras', value: 'honduras' },
    { label: 'Hungary', value: 'hungary' },
    { label: 'Iceland', value: 'iceland' },
    { label: 'India', value: 'india' },
    { label: 'Indonesia', value: 'indonesia' },
    { label: 'Iran', value: 'iran' },
    { label: 'Iraq', value: 'iraq' },
    { label: 'Ireland', value: 'ireland' },
    { label: 'Israel', value: 'israel' },
    { label: 'Italy', value: 'italy' },
    { label: 'Jamaica', value: 'jamaica' },
    { label: 'Japan', value: 'japan' },
    { label: 'Jordan', value: 'jordan' },
    { label: 'Kazakhstan', value: 'kazakhstan' },
    { label: 'Kenya', value: 'kenya' },
    { label: 'Kiribati', value: 'kiribati' },
    { label: 'Korea', value: 'korea' },
    { label: 'Kosovo', value: 'kosovo' },
    { label: 'Kuwait', value: 'kuwait' },
    { label: 'Kyrgyzstan', value: 'kyrgyzstan' },
    { label: 'Laos', value: 'laos' },
    { label: 'Latvia', value: 'latvia' },
    { label: 'Lebanon', value: 'lebanon' },
    { label: 'Lesotho', value: 'lesotho' },
    { label: 'Liberia', value: 'liberia' },
    { label: 'Libya', value: 'libya' },
    { label: 'Liechtenstein', value: 'liechtenstein' },
    { label: 'Lithuania', value: 'lithuania' },
    { label: 'Luxembourg', value: 'luxembourg' },
    { label: 'Madagascar', value: 'madagascar' },
    { label: 'Malawi', value: 'malawi' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Maldives', value: 'maldives' },
    { label: 'Mali', value: 'mali' },
    { label: 'Malta', value: 'malta' },
    { label: 'Marshall Islands', value: 'marshall-islands' },
    { label: 'Martinique', value: 'martinique' },
    { label: 'Mauritania', value: 'mauritania' },
    { label: 'Mauritius', value: 'mauritius' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'Micronesia', value: 'micronesia' },
    { label: 'Moldova', value: 'moldova' },
    { label: 'Monaco', value: 'monaco' },
    { label: 'Montenegro', value: 'montenegro' },
    { label: 'Morocco', value: 'morocco' },
    { label: 'Mozambique', value: 'mozambique' },
    { label: 'Namibia', value: 'namibia' },
    { label: 'Nauru', value: 'nauru' },
    { label: 'Nepal', value: 'nepal' },
    { label: 'Netherlands', value: 'netherlands' },
    { label: 'New Zealand', value: 'new-zealand' },
    { label: 'Nigeria', value: 'nigeria' },
    { label: 'North Korea', value: 'north-korea' },
    { label: 'Norway', value: 'norway' },
    { label: 'Oman', value: 'oman' },
    { label: 'Palau', value: 'palau' },
    { label: 'Papua New Guinea', value: 'papua-new-guinea' },
    { label: 'Paraguay', value: 'paraguay' },
    { label: 'Peru', value: 'peru' },
    { label: 'Philippines', value: 'philippines' },
    { label: 'Poland', value: 'poland' },
    { label: 'Portugal', value: 'portugal' },
    { label: 'Puerto Rico', value: 'puerto-rico' },
    { label: 'Qatar', value: 'qatar' },
    { label: 'Republic of the Congo', value: 'republic-congo' },
    { label: 'Romania', value: 'romania' },
    { label: 'Russia', value: 'russia' },
    { label: 'Rwanda', value: 'rwanda' },
    { label: 'Samoa', value: 'samoa' },
    { label: 'San Marino', value: 'san-marino' },
    { label: 'Saudi Arabia', value: 'saudi-arabia' },
    { label: 'Senegal', value: 'senegal' },
    { label: 'Serbia', value: 'serbia' },
    { label: 'Seychelles', value: 'seychelles' },
    { label: 'Sierra Leone', value: 'sierra-leone' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'Slovakia', value: 'slovakia' },
    { label: 'Slovenia', value: 'slovenia' },
    { label: 'Solomon Islands', value: 'solomon-islands' },
    { label: 'South Africa', value: 'south-africa' },
    { label: 'South Korea', value: 'south-korea' },
    { label: 'Spain', value: 'spain' },
    { label: 'St. Kitts & Nevis', value: 'st-kitts-nevis' },
    { label: 'St. Lucia', value: 'st-lucia' },
    { label: 'St. Vincent & The Grenadines', value: 'st-vincent-grenadines' },
    { label: 'Suriname', value: 'suriname' },
    { label: 'Sudan', value: 'sudan' },
    { label: 'Sri Lanka' , value: 'sri-lanka' },
    { label: 'Swaziland', value: 'swaziland' },
    { label: 'Sweden', value: 'sweden' },
    { label: 'Switzerland', value: 'switzerland' },
    { label: 'Syria', value: 'syria' },
    { label: 'Taiwan', value: 'taiwan' },
    { label: 'Tajikistan', value: 'tajikistan' },
    { label: 'Tanzania', value: 'tanzania' },
    { label: 'Thailand', value: 'thailand' },
    { label: 'Timor-Leste', value: 'timor-leste' },
    { label: 'Togo', value: 'togo' },
    { label: 'Trinidad & Tobago', value: 'trinidad-tobago' },
    { label: 'Tunisia', value: 'tunisia' },
    { label: 'Turkey', value: 'turkey' },
    { label: 'Turkmenistan', value: 'turkmenistan' },
    { label: 'Tuvalu', value: 'tuvalu' },
    { label: 'Uganda', value: 'uganda' },
    { label: 'Ukraine', value: 'ukraine' },
    { label: 'United Arab Emirates', value: 'uae' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'United States of America', value: 'usa' },
    { label: 'Uruguay', value: 'uruguay' },
    { label: 'Uzbekistan', value: 'uzbekistan' },
    { label: 'Vanuatu', value: 'vanuatu' },
    { label: 'Venezuela', value: 'venezuela' },
    { label: 'Vietnam', value: 'vietnam' },
    { label: 'West Bank and Gaza', value: 'west-bank-gaza' },
    { label: 'Yemen', value: 'yemen' },
    { label: 'Zambia', value: 'zambia' },
    { label: 'Zimbabwe', value: 'zimbabwe' },
    { label: 'Operation Christmas Child', value: 'operation-christmas-child' },
    { label: 'Cuba', value: 'cuba' },
    { label: 'Nicaragua', value: 'nicaragua' },
    { label: 'Panama', value: 'panama' },
    { label: 'South Korea (Duplicate)', value: 'south-korea-duplicate' },
  ];

  const {
    selectedList,
    newSelection,
    loading,
    error,
    addCountry,
    removeCountry,
    setNewSelection
  } = useCountriesManager(orderId, refresh);

  // Filter out 'select' option and already selected countries
  const availableOptions = [
    ...allCountries
      .filter(country =>
        country.value !== 'select' &&
        !selectedList.includes(country.label)
      )
  ];

  // Prevent showing loading state if we have data
  if (loading && selectedList.length === 0) {
    return <Text>Loading...</Text>;
  }
  // Add this after your imports
  const smartChunk = (array) => {
    const chunks = [];
    let currentChunk = [];
    let currentWidth = 0;
  
    array.forEach((item) => {
      const itemWidth = item.length > 8 ? 0.5 : 0.25; // 50% or 25% width
  
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
  };


  return (
    <AdminBlock title="Glasses Distribution Countries" loading={loading}>
      <BlockStack spacing="loose" blockGap="base">
        {error && <Banner status="critical">{error}</Banner>}
        {selectedList.length === 0 && <Heading size={5}>No countries selected</Heading>}
        {selectedList.length > 0 && <Heading size={5}>Which Country will The Glasses Be Distributed?</Heading>}
        <BlockStack gap="base">
          {smartChunk(selectedList).map((row, rowIndex) => (
            <InlineStack
              key={rowIndex}
              gap="base"
              blockAlignment="center"
              wrap={true}
            >
              {row.map((countryLabel) => (
                  <Link
                    key={countryLabel}
                    onPress={() => handleRemoveCountry(countryLabel)}
                    variant="tertiary"
                  >
                    <Badge
                      icon={removingCountry === countryLabel ? undefined : "CancelMajor"}
                      iconPosition='end'
                    >
                      {countryLabel}
                      {removingCountry === countryLabel && (
                        <ProgressIndicator size="small-300" />
                      )}
                    </Badge>
                  </Link>
              ))}
            </InlineStack>
          ))}
        </BlockStack>
        <Divider />
        <Select
          label="Add a country"
          value={newSelection}
          padding="base"
          placeholder="Select a country"
          onChange={(value) => {
            const selectedCountry = allCountries.find(c => c.value === value);
            setNewSelection(value);
            if (selectedCountry) {
              addCountry(selectedCountry.label);
            }
          }}
          options={availableOptions}
        />
      </BlockStack>
    </AdminBlock>
  );
}