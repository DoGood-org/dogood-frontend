'use client';

import { useEffect, useState } from 'react';
import csc, { ICountry, IState, ICity } from 'country-state-city';

interface LocationSelectProps {
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  selectedCountry?: string;
  selectedState?: string;
  selectedCity?: string;
}

export const LocationSelect = ({
  onCountryChange,
  onStateChange,
  onCityChange,
  selectedCountry,
  selectedState,
  selectedCity,
}: LocationSelectProps): React.JSX.Element => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  // Load countries on component mount
  useEffect(() => {
    const allCountries = csc.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }
    const countryStates = csc.getStatesOfCountry(selectedCountry);
    setStates(countryStates);
    onStateChange(''); // Reset state when country changes
    onCityChange(''); // Reset city when country changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // Update cities when state changes
  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      return;
    }
    const stateCities = csc.getCitiesOfState(selectedCountry, selectedState);
    setCities(stateCities);
    onCityChange(''); // Reset city when state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, selectedCountry]);

  return (
    <div className="space-y-4">
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-background"
      >
        <option value="">Select country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        onChange={(e) => onStateChange(e.target.value)}
        disabled={!selectedCountry}
        className="w-full p-2 border rounded-md bg-background disabled:opacity-50"
      >
        <option value="">Select state/province</option>
        {states.map((state) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        disabled={!selectedState}
        className="w-full p-2 border rounded-md bg-background disabled:opacity-50"
      >
        <option value="">Select city</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};
