import { View, Text } from 'react-native-ui-lib';
import { useController } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  name: string;
  control: any;
}

export default function FormInput({
  name,
  control,
  ...inputProps
}: FormInputProps) {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  });

  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        {...inputProps}
      />
      {errors[name]?.message && (
        <Text red10>{String(errors[name]?.message)}</Text>
      )}
    </View>
  );
}
