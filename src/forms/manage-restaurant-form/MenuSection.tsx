import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Menu</h2>
        <p className="text-sm text-slate-500">
          Create your menu and give each item a name and a price
        </p>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <MenuItemInput
                key={field.id}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => append({ name: "", price: 0, imageUrl: "" })}
        className="app-primary-button"
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
