import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="mt-2 flex flex-row items-center space-x-2 space-y-0 rounded-full border border-orange-100 bg-white px-3 py-2 transition-colors duration-200 hover:bg-orange-50">
      <FormControl>
        <Checkbox
          className="border-orange-300 bg-white data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-medium text-slate-700">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
