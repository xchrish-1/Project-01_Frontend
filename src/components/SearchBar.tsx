import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  variant?: "default" | "hero";
  showReset?: boolean;
};

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  variant = "default",
  showReset = true,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });
  const isHeroVariant = variant === "hero";

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex w-full items-center gap-3 transition-all duration-300",
          isHeroVariant
            ? "flex-col rounded-[28px] border border-white bg-white p-4 shadow-[0_26px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(15,23,42,0.22)] md:flex-row md:gap-4 md:p-5"
            : "flex-row justify-between rounded-full border-2 border-orange-100 bg-white p-3 shadow-sm focus-within:border-orange-300 focus-within:shadow-lg",
          form.formState.errors.searchQuery && "border-red-500"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full",
            isHeroVariant
              ? "h-12 w-12 bg-white text-orange-500 md:h-14 md:w-14"
              : "ml-1 hidden text-orange-500 md:flex"
          )}
        >
          <Search
            strokeWidth={2.5}
            size={isHeroVariant ? 24 : 30}
            className={cn(!isHeroVariant && "text-orange-500")}
          />
        </div>
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    "border-none bg-transparent shadow-none placeholder:text-slate-400 focus-visible:ring-0",
                    isHeroVariant
                      ? "h-auto bg-white px-0 py-1 text-lg font-medium text-slate-800 placeholder:text-slate-400 md:text-2xl"
                      : "text-xl"
                  )}
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {showReset && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className={cn(
              "rounded-full border-orange-100 text-slate-700 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700",
              isHeroVariant && "h-12 px-6 text-base"
            )}
          >
            Reset
          </Button>
        )}
        <Button
          type="submit"
          className={cn(
            "rounded-full",
            isHeroVariant
              ? "h-12 w-full bg-slate-950 px-8 text-base font-semibold text-white hover:bg-orange-600 md:w-auto"
              : "app-primary-button"
          )}
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
