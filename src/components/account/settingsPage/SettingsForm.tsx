'use client';

import { LocationSelect, Section } from '@/components';
import { Button, Input } from '@/components'; // Assuming Input is exported from here
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import csc from 'country-state-city';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
});

export const SettingsForm = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      country: '',
      state: '',
      city: '',
    },
  });

  const countryValue = watch('country');
  const stateValue = watch('state');
  const cityValue = watch('city');

  const onSubmit = (data: z.infer<typeof formSchema>): void => {
    // Get the full names of the selected locations
    const selectedCountryObj = csc
      .getAllCountries()
      .find((c) => c.isoCode === data.country);
    const selectedStateObj = csc
      .getStatesOfCountry(data.country)
      .find((s) => s.isoCode === data.state);

    console.log('Form submitted:', {
      fullName: data.fullName,
      country: selectedCountryObj?.name || data.country,
      state: selectedStateObj?.name || data.state,
      city: data.city,
    });
  };

  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <div>
          <Input
            {...register('fullName')}
            placeholder="Enter your full name"
            className="w-full"
          />
          {errors.fullName && (
            <p className="text-sm font-medium text-destructive mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register('country')} />
        <input type="hidden" {...register('state')} />
        <input type="hidden" {...register('city')} />

        <LocationSelect
          onCountryChange={(value) => setValue('country', value)}
          onStateChange={(value) => setValue('state', value)}
          onCityChange={(value) => setValue('city', value)}
          selectedCountry={countryValue}
          selectedState={stateValue}
          selectedCity={cityValue}
        />

        {errors.country && (
          <p className="text-sm font-medium text-destructive">
            {errors.country.message}
          </p>
        )}
        {errors.state && (
          <p className="text-sm font-medium text-destructive">
            {errors.state.message}
          </p>
        )}
        {errors.city && (
          <p className="text-sm font-medium text-destructive">
            {errors.city.message}
          </p>
        )}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Section>
  );
};
