'use client';
import { Input } from '@/components/ui/Input';
import { IFormLocation } from '@/types/mapType';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useForm } from 'react-hook-form';

type Props = {
  forInput?: {
    [key: string]: any;
  };
  forForm?: {
    [key: string]: any;
  };
};
export const FormLocationComponent = (props: Props) => {
 

  const { register, handleSubmit, reset } = useForm<IFormLocation>({
    defaultValues: {
      location: props.forInput?.value || '',
    },

  });
  const { name, onChange, onBlur: rhfOnBlur, ref } = register('location');



  const submitHandler = (data: IFormLocation): void => {
    console.log('Submitted location:', data.location);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={`bg-card ${props.forForm?.className || ''}`}
    >
      <label htmlFor="location-input" className="sr-only">
        {props.forInput?.placeholder || '...enter location'}
      </label>
      <Input
        id={props.forInput?.id || 'location-input'}
        type={props.forInput?.type || 'text'}
        placeholder={props.forInput?.placeholder || 'Enter location'}
        className={props.forInput?.className || ''}
        name={name}
        ref={ref}
        onChange={onChange}
        onFocus={() => useMapStore.getState().setInputActive(true)}
        onBlur={async (e) => {
          await rhfOnBlur(e);
          useMapStore.getState().setInputInactiveAndHide();
        }}

      />
    </form>
  );
};