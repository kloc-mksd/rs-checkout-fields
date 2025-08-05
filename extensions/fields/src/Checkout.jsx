import {
  reactExtension,
  BlockStack,
  Choice,
  ChoiceList,
  Text,
  InlineStack,
  ScrollView,
  useApplyMetafieldsChange,
  useBuyerJourneyIntercept,
  Heading,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';
import React, { useState } from 'react';

export default reactExtension(
  'purchase.checkout.actions.render-before',
  () => <Extension />,
);

function Extension() {
  const { heading_text } = useSettings();
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [error, setError] = useState(false); // State to track validation error
  const applyMetafieldsChange = useApplyMetafieldsChange();
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
  

  useBuyerJourneyIntercept(() => {
    try {
      if (selectedCountries.length === 0 ) {
        return {
          behavior: 'block',
          reason: 'At least one country must be selected.',
          perform: (result) => {
            if (result.behavior === 'block') {
              setError(true);
              setErrorMessage('At least one country must be selected.');
            }
          },
        };
      }

    
      return {
        behavior: 'allow',
        perform: () => {
          setError(false);
        },
      };

      } catch (error) {
        console.error('Checkout error:', err);
          setError(true);
          setErrorMessage(`An error occurred: ${err.message}`);
          return {
            behavior: 'block',
            reason: 'An error occurred during checkout.',
          };
        }
    }
  ); 
  

  const handleChoiceListChange = (value) => {
    try {
    setSelectedCountries(value); // Always update state, even if empty
  
    if (value.length > 0) {
      setError(false);
      setErrorMessage(''); 
  
      // Update the metafield
      applyMetafieldsChange({
        type: "updateMetafield",
        namespace: "custom",
        key: "glasses_country",
        valueType: "json_string",
        value: JSON.stringify(value),
      });
    } else {
      // Don't update metafield if nothing is selected
      setError(true);
      setErrorMessage('You must select at least one country.');
    }
  } catch (error) {
    console.error('Error updating metafield:', error);
    setError(true);
    setErrorMessage(`An error occurred: ${error.message}`);
  }
  };
  

  return (
    <BlockStack padding={["none", "none", "loose", "none"]}>
      <Heading level={3}>{heading_text}</Heading>
      <ScrollView maxBlockSize={150}>
        <InlineStack>
          <ChoiceList
            name="glasses-country"
            value={selectedCountries}
            onChange={handleChoiceListChange}
          >
            <BlockStack>
              <Choice id="Albania">Albania</Choice>
              <Choice id="Andorra">Andorra</Choice>
              <Choice id="Angola">Angola</Choice>
              <Choice id="Antigua & Barbuda">Antigua & Barbuda</Choice>
              <Choice id="Argentina">Argentina</Choice>
              <Choice id="Armenia">Armenia</Choice>
              <Choice id="Aruba">Aruba</Choice>
              <Choice id="Australia">Australia</Choice>
              <Choice id="Austria">Austria</Choice>
              <Choice id="Azerbaijan">Azerbaijan</Choice>
              <Choice id="Bahamas">Bahamas</Choice>
              <Choice id="Bahrain">Bahrain</Choice>
              <Choice id="Bangladesh">Bangladesh</Choice>
              <Choice id="Barbados">Barbados</Choice>
              <Choice id="Belarus">Belarus</Choice>
              <Choice id="Belgium">Belgium</Choice>
              <Choice id="Belize">Belize</Choice>
              <Choice id="Benin">Benin</Choice>
              <Choice id="Bhutan">Bhutan</Choice>
              <Choice id="Bolivia">Bolivia</Choice>
              <Choice id="Bosnia & Herzegovina">Bosnia & Herzegovina</Choice>
              <Choice id="Botswana">Botswana</Choice>
              <Choice id="Brazil">Brazil</Choice>
              <Choice id="Brunei">Brunei</Choice>
              <Choice id="Bulgaria">Bulgaria</Choice>
              <Choice id="Burkina Faso">Burkina Faso</Choice>
              <Choice id="Burma">Burma</Choice>
              <Choice id="Burundi">Burundi</Choice>
              <Choice id="Cambodia">Cambodia</Choice>
              <Choice id="Canada">Canada</Choice>
              <Choice id="Cape Verde">Cape Verde</Choice>
              <Choice id="Cayman Islands">Cayman Islands</Choice>
              <Choice id="Central African Republic">Central African Republic</Choice>
              <Choice id="Chad">Chad</Choice>
              <Choice id="Chile">Chile</Choice>
              <Choice id="China">China</Choice>
              <Choice id="China (Including Hong Kong)">China (Including Hong Kong)</Choice>
              <Choice id="Colombia">Colombia</Choice>
              <Choice id="Comoros">Comoros</Choice>
              <Choice id="Costa Rica">Costa Rica</Choice>
              <Choice id="Cote D'Ivoire">Cote D'Ivoire</Choice>
              <Choice id="Croatia">Croatia</Choice>
              <Choice id="Czech Republic">Czech Republic</Choice>
              <Choice id="Democratic Republic of the Congo">Democratic Republic of the Congo</Choice>
              <Choice id="Denmark">Denmark</Choice>
              <Choice id="Djibouti">Djibouti</Choice>
              <Choice id="Dominica">Dominica</Choice>
              <Choice id="Dominican Republic">Dominican Republic</Choice>
              <Choice id="East Timor">East Timor</Choice>
              <Choice id="Ecuador">Ecuador</Choice>
              <Choice id="Egypt">Egypt</Choice>
              <Choice id="El Salvador">El Salvador</Choice>
              <Choice id="Equatorial Guinea">Equatorial Guinea</Choice>
              <Choice id="Eritrea">Eritrea</Choice>
              <Choice id="Estonia">Estonia</Choice>
              <Choice id="Ethiopia">Ethiopia</Choice>
              <Choice id="Fiji">Fiji</Choice>
              <Choice id="Finland">Finland</Choice>
              <Choice id="France">France</Choice>
              <Choice id="French Guiana">French Guiana</Choice>
              <Choice id="Fyr Macedonia">Fyr Macedonia</Choice>
              <Choice id="Gabon">Gabon</Choice>
              <Choice id="Gambia">Gambia</Choice>
              <Choice id="Georgia">Georgia</Choice>
              <Choice id="Germany">Germany</Choice>
              <Choice id="Ghana">Ghana</Choice>
              <Choice id="Greece">Greece</Choice>
              <Choice id="Greenland">Greenland</Choice>
              <Choice id="Grenada">Grenada</Choice>
              <Choice id="Guatemala">Guatemala</Choice>
              <Choice id="Guinea">Guinea</Choice>
              <Choice id="Guinea Bissau">Guinea Bissau</Choice>
              <Choice id="Guyana">Guyana</Choice>
              <Choice id="Haiti">Haiti</Choice>
              <Choice id="Holy See">Holy See</Choice>
              <Choice id="Honduras">Honduras</Choice>
              <Choice id="Hungary">Hungary</Choice>
              <Choice id="Iceland">Iceland</Choice>
              <Choice id="India">India</Choice>
              <Choice id="Indonesia">Indonesia</Choice>
              <Choice id="Iran">Iran</Choice>
              <Choice id="Iraq">Iraq</Choice>
              <Choice id="Ireland">Ireland</Choice>
              <Choice id="Israel">Israel</Choice>
              <Choice id="Italy">Italy</Choice>
              <Choice id="Jamaica">Jamaica</Choice>
              <Choice id="Japan">Japan</Choice>
              <Choice id="Jordan">Jordan</Choice>
              <Choice id="Kazakhstan">Kazakhstan</Choice>
              <Choice id="Kenya">Kenya</Choice>
              <Choice id="Kiribati">Kiribati</Choice>
              <Choice id="Korea">Korea</Choice>
              <Choice id="Kosovo">Kosovo</Choice>
              <Choice id="Kuwait">Kuwait</Choice>
              <Choice id="Kyrgyzstan">Kyrgyzstan</Choice>
              <Choice id="Laos">Laos</Choice>
              <Choice id="Latvia">Latvia</Choice>
              <Choice id="Lebanon">Lebanon</Choice>
              <Choice id="Lesotho">Lesotho</Choice>
              <Choice id="Liberia">Liberia</Choice>
              <Choice id="Libya">Libya</Choice>
              <Choice id="Liechtenstein">Liechtenstein</Choice>
              <Choice id="Lithuania">Lithuania</Choice>
              <Choice id="Luxembourg">Luxembourg</Choice>
              <Choice id="Madagascar">Madagascar</Choice>
              <Choice id="Malawi">Malawi</Choice>
              <Choice id="Malaysia">Malaysia</Choice>
              <Choice id="Maldives">Maldives</Choice>
              <Choice id="Mali">Mali</Choice>
              <Choice id="Malta">Malta</Choice>
              <Choice id="Marshall Islands">Marshall Islands</Choice>
              <Choice id="Martinique">Martinique</Choice>
              <Choice id="Mauritania">Mauritania</Choice>
              <Choice id="Mauritius">Mauritius</Choice>
              <Choice id="Mexico">Mexico</Choice>
              <Choice id="Micronesia">Micronesia</Choice>
              <Choice id="Moldova">Moldova</Choice>
              <Choice id="Monaco">Monaco</Choice>
              <Choice id="Montenegro">Montenegro</Choice>
              <Choice id="Morocco">Morocco</Choice>
              <Choice id="Mozambique">Mozambique</Choice>
              <Choice id="Namibia">Namibia</Choice>
              <Choice id="Nauru">Nauru</Choice>
              <Choice id="Nepal">Nepal</Choice>
              <Choice id="Netherlands">Netherlands</Choice>
              <Choice id="New Zealand">New Zealand</Choice>
              <Choice id="Nigeria">Nigeria</Choice>
              <Choice id="North Korea">North Korea</Choice>
              <Choice id="Norway">Norway</Choice>
              <Choice id="Oman">Oman</Choice>
              <Choice id="Palau">Palau</Choice>
              <Choice id="Papua New Guinea">Papua New Guinea</Choice>
              <Choice id="Paraguay">Paraguay</Choice>
              <Choice id="Peru">Peru</Choice>
              <Choice id="Philippines">Philippines</Choice>
              <Choice id="Poland">Poland</Choice>
              <Choice id="Portugal">Portugal</Choice>
              <Choice id="Puerto Rico">Puerto Rico</Choice>
              <Choice id="Qatar">Qatar</Choice>
              <Choice id="Republic of the Congo">Republic of the Congo</Choice>
              <Choice id="Romania">Romania</Choice>
              <Choice id="Russia">Russia</Choice>
              <Choice id="Rwanda">Rwanda</Choice>
              <Choice id="Samoa">Samoa</Choice>
              <Choice id="San Marino">San Marino</Choice>
              <Choice id="Saudi Arabia">Saudi Arabia</Choice>
              <Choice id="Senegal">Senegal</Choice>
              <Choice id="Serbia">Serbia</Choice>
              <Choice id="Seychelles">Seychelles</Choice>
              <Choice id="Sierra Leone">Sierra Leone</Choice>
              <Choice id="Singapore">Singapore</Choice>
              <Choice id="Slovakia">Slovakia</Choice>
              <Choice id="Slovenia">Slovenia</Choice>
              <Choice id="Solomon Islands">Solomon Islands</Choice>
              <Choice id="South Africa">South Africa</Choice>
              <Choice id="South Korea">South Korea</Choice>
              <Choice id="Spain">Spain</Choice>
              <Choice id="St. Kitts & Nevis">St. Kitts & Nevis</Choice>
              <Choice id="St. Lucia">St. Lucia</Choice>
              <Choice id="St. Vincent & The Grenadines">St. Vincent & The Grenadines</Choice>
              <Choice id="Suriname">Suriname</Choice>
              <Choice id="Swaziland">Swaziland</Choice>
              <Choice id="Sweden">Sweden</Choice>
              <Choice id="Switzerland">Switzerland</Choice>
              <Choice id="Syria">Syria</Choice>
              <Choice id="Taiwan">Taiwan</Choice>
              <Choice id="Tajikistan">Tajikistan</Choice>
              <Choice id="Tanzania">Tanzania</Choice>
              <Choice id="Thailand">Thailand</Choice>
              <Choice id="Timor-Leste">Timor-Leste</Choice>
              <Choice id="Togo">Togo</Choice>
              <Choice id="Trinidad & Tobago">Trinidad & Tobago</Choice>
              <Choice id="Tunisia">Tunisia</Choice>
              <Choice id="Turkey">Turkey</Choice>
              <Choice id="Turkmenistan">Turkmenistan</Choice>
              <Choice id="Tuvalu">Tuvalu</Choice>
              <Choice id="Uganda">Uganda</Choice>
              <Choice id="Ukraine">Ukraine</Choice>
              <Choice id="United Arab Emirates">United Arab Emirates</Choice>
              <Choice id="United Kingdom">United Kingdom</Choice>
              <Choice id="United States of America">United States of America</Choice>
              <Choice id="Uruguay">Uruguay</Choice>
              <Choice id="Uzbekistan">Uzbekistan</Choice>
              <Choice id="Vanuatu">Vanuatu</Choice>
              <Choice id="Venezuela">Venezuela</Choice>
              <Choice id="Vietnam">Vietnam</Choice>
              <Choice id="West Bank and Gaza">West Bank and Gaza</Choice>
              <Choice id="Yemen">Yemen</Choice>
              <Choice id="Zambia">Zambia</Choice>
              <Choice id="Zimbabwe">Zimbabwe</Choice>
              <Choice id="Operation Christmas Child">Operation Christmas Child</Choice>
              <Choice id="Cuba">Cuba</Choice>
              <Choice id="Nicaragua">Nicaragua</Choice>
              <Choice id="Panama">Panama</Choice>
              <Choice id="South Korea">South Korea</Choice>
            </BlockStack>
          </ChoiceList>
        </InlineStack>
      </ScrollView>

      {error && (
        <Text size="small" appearance="critical">
          {errorMessage}
        </Text>
      )}
    </BlockStack>
  );
}
