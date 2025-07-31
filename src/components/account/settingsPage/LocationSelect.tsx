'use client';

import { useEffect, useState } from 'react';
import csc, { ICountry, IState, ICity } from 'country-state-city';
import { SelectField } from '@/components';
import { useTranslations } from 'next-intl';

interface LocationSelectProps {
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  selectedCountry?: string;
  selectedState?: string;
  selectedCity?: string;
  className?: string;
  countryError?: string;
  stateError?: string;
}

export const LocationSelect = ({
  onCountryChange,
  onStateChange,
  onCityChange,
  selectedCountry,
  selectedState,
  selectedCity,
  className = '',
  countryError,
  stateError,
}: LocationSelectProps): React.JSX.Element => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const t = useTranslations('settings');

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
  }, [selectedState, selectedCountry]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <SelectField
          value={selectedCountry}
          onValueChange={onCountryChange}
          options={countries.map((country) => ({
            value: country.isoCode,
            label: country.name,
          }))}
          label={t('location.country')}
          placeholder="Select country"
        />
        {countryError && (
          <p className="text-sm font-medium text-error">{countryError}</p>
        )}
      </div>

      <div className="space-y-2">
        <SelectField
          value={selectedState}
          onValueChange={onStateChange}
          options={states.map((state) => ({
            value: state.isoCode,
            label: state.name,
          }))}
          label={t('location.region')}
          placeholder="Select region"
          disabled={!selectedCountry}
        />
        {stateError && (
          <p className="text-sm font-medium text-error">{stateError}</p>
        )}
      </div>

      <div className="space-y-2">
        <SelectField
          value={selectedCity}
          onValueChange={onCityChange}
          options={cities.map((city) => ({
            value: city.name,
            label: city.name,
          }))}
          label={t('location.city')}
          placeholder="Select city"
          disabled={!selectedState}
        />
      </div>
    </div>
  );
};
