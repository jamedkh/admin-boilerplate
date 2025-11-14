"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Plus, Trash2, X } from "lucide-react";
import * as z from "zod";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/schemas/form";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUpload } from "@/components/file-upload";
import { DatePicker } from "@/components/date-picker";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface MyFormValues {
  dateOfBirth: Date;
}

function InfluencerDrawer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialHandles: [{ platform: "", handle: "" }],
      category: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialHandles",
  });

  const [tagInput, setTagInput] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const value = tagInput.trim();
      if (value) {
        const currentTags = form.getValues("category") || [];
        form.setValue("category", [...currentTags, value]);
        setTagInput("");
      }
    }
  };

  const { control, handleSubmit } = useForm<MyFormValues>({
    defaultValues: {
      dateOfBirth: new Date(),
    },
  });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="btn-fill primary">
            <Plus />
            Add New
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full! lg:max-w-[70%]! gap-0">
          <SheetHeader>
            <SheetTitle>Add Influencer</SheetTitle>
            <SheetDescription>
              Make changes here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <ScrollArea className="w-full h-[calc(100vh-160px)] border-y py-3">
                <div className="m-3">
                  <Controller
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 m-3 py-3">
                  <div className="lg:col-span-6 col-span-12">
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-6 col-span-12">
                    <Controller
                      control={form.control}
                      name="phone"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            {...field}
                            aria-invalid={fieldState.invalid}
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 m-3">
                  <div className="lg:col-span-4 col-span-12">
                    <Controller
                      control={control}
                      name="dateOfBirth"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Date of Birth{" "}
                          </FieldLabel>
                          <DatePicker field={field} />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-4 col-span-12">
                    <Controller
                      control={form.control}
                      name="region"
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor={field.name}>Region</FieldLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            name={field.name}
                          >
                            <SelectTrigger data-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xs">
                              <SelectItem value="north">North</SelectItem>
                              <SelectItem value="south">South</SelectItem>
                              <SelectItem value="east">East</SelectItem>
                              <SelectItem value="west">West</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-4 col-span-12">
                    <Controller
                      control={form.control}
                      name="city"
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor={field.name}>City</FieldLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger data-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xs">
                              <SelectItem value="city1">City 1</SelectItem>
                              <SelectItem value="city2">City 2</SelectItem>
                              <SelectItem value="city3">City 3</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                {/* Social Media Handles Section */}

                <fieldset className="p-3 m-3 border rounded-xs">
                  <legend>Social Media Handles</legend>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex flex-col gap-4 items-start my-3 lg:flex-row"
                    >
                      <Controller
                        control={form.control}
                        name={`socialHandles.${index}.platform`}
                        render={({ field, fieldState }) => (
                          <Field className="w-full lg:w-[180px]">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="w-full"
                                data-invalid={fieldState.invalid}
                              >
                                <SelectValue placeholder="Platform" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xs">
                                <SelectItem value="facebook">
                                  Facebook
                                </SelectItem>
                                <SelectItem value="instagram">
                                  Instagram
                                </SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`socialHandles.${index}.handle`}
                        render={({ field, fieldState }) => (
                          <Field
                            className="lg:flex-1 w-full"
                            data-invalid={fieldState.invalid}
                          >
                            <Input
                              placeholder="https://example.com/username"
                              {...field}
                              className="w-full"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    className="float-end"
                    type="button"
                    variant="outline"
                    onClick={() => append({ platform: "", handle: "" })}
                  >
                    <Plus /> Add Social Handle
                  </Button>
                  <div>{form.formState.errors.socialHandles?.message}</div>
                </fieldset>

                <div className="m-3">
                  <Controller
                    control={form.control}
                    name="language"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger data-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="m-3">
                  <Controller
                    control={form.control}
                    name="category"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Categories</FieldLabel>
                        <div className="space-y-2">
                          <Input
                            placeholder="Type and press Enter or comma to add"
                            value={tagInput}
                            name={field.name}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            aria-invalid={fieldState.invalid}
                          />
                          <div className="flex flex-wrap gap-2">
                            {field.value?.map((tag, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-black"
                              >
                                <span>{tag}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newTags = [...field.value];
                                    newTags.splice(index, 1);
                                    form.setValue("category", newTags);
                                  }}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="m-3">
                  <Controller
                    control={form.control}
                    name="photo"
                    render={({ field, fieldState }) => (
                      <Field
                        className="col-span-full "
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor={field.name}>
                          Photo (Optional)
                        </FieldLabel>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </ScrollArea>
            </FieldGroup>

            <SheetFooter className="flex flex-row justify-end gap-4 mt-0 sm:space-x-0 pb-2">
              <SheetClose asChild>
                <Button variant={"outline"}>Close</Button>
              </SheetClose>
              <Button className="btn-fill primary">Save changes</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default InfluencerDrawer;
