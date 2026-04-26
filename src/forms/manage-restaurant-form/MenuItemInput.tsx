import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  const menuItem = useWatch({
    control,
    name: `menuItems.${index}`,
  });
  const fileInputId = `menu-item-image-${index}`;
  const selectedFileName =
    menuItem?.imageFile?.name ||
    (menuItem?.imageUrl ? "Current image saved" : "No file chosen");

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-orange-100 bg-orange-50/50 p-4 md:flex-row md:items-end">
      <div className="grid flex-1 gap-3 md:grid-cols-[minmax(0,1fr)_11rem_minmax(0,18rem)_7.5rem] md:items-end">
        <FormField
          control={control}
          name={`menuItems.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cheese Pizza"
                  className="app-input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price (Rs.) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="8.00" className="app-input" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.imageFile`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dish image</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    id={fileInputId}
                    name={field.name}
                    ref={field.ref}
                    className="sr-only"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : undefined
                      )
                    }
                  />
                  <label
                    htmlFor={fileInputId}
                    className="app-input flex h-10 cursor-pointer items-center gap-3 rounded-md px-3"
                  >
                    <span className="rounded-md bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                      Choose file
                    </span>
                    <span className="min-w-0 truncate text-sm text-slate-500">
                      {selectedFileName}
                    </span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={removeMenuItem}
          variant="outline"
          className="h-10 border-red-100 text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default MenuItemInput;
