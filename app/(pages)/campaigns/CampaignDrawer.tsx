"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  CampaignFormSchema,
  defaultCampaignValues,
} from "@/lib/schemas/campaign";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function CampaignDrawer() {
  const form = useForm<z.infer<typeof CampaignFormSchema>>({
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: defaultCampaignValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "kpiMetrics",
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({ metric: "", target: 0, unit: "" });
    }
  }, [append, fields.length]);

  const [includeCategoryInput, setIncludeCategoryInput] = React.useState("");
  const [excludeCategoryInput, setExcludeCategoryInput] = React.useState("");
  // const [includeTagInput, setIncludeTagInput] = React.useState("");
  // const [excludeTagInput, setExcludeTagInput] = React.useState("");

  function onSubmit(data: z.infer<typeof CampaignFormSchema>) {
    console.log(data);
  }

  const handleTagInput = (
    e: React.KeyboardEvent,
    inputValue: string,
    fieldName:
      | "includeCategories"
      | "excludeCategories"
      | "includeAffinityTags"
      | "excludeAffinityTags",
    setInput: (value: string) => void
  ) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const value = inputValue.trim();
      if (value) {
        const currentValues = (form.getValues(fieldName) ?? []) as string[];
        form.setValue(fieldName, [...currentValues, value]);
        setInput("");
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="btn-fill primary">
          <Plus />
          Add New
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full! lg:max-w-[70%]! gap-0">
        <SheetHeader>
          <SheetTitle>Create New Campaign</SheetTitle>
          <SheetDescription>
            Set up your campaign details and requirements.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="">
            <ScrollArea className="w-full h-[calc(100vh-160px)] border-y py-3">
              {/* Basic Information */}
              <div className="space-y-4 m-3 pr-3">
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Campaign Category
                      </FieldLabel>
                      <Select
                        name={field.name}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xs">
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="awareness">Awareness</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Influencer Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    control={form.control}
                    name="influencerRegion"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Region</FieldLabel>
                        <Select
                          name={field.name}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
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

                  <Controller
                    control={form.control}
                    name="influencerLanguage"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                        <Select
                          name={field.name}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                            <SelectItem value="punjabi">Punjabi</SelectItem>
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
                    name="influencerAgeBracket"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Age Bracket
                        </FieldLabel>
                        <Select
                          name={field.name}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select age bracket" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xs">
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45+">45+</SelectItem>
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Budget</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        control={form.control}
                        name="budgetRange.min"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Minimum
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name="budgetRange.max"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Maximum
                            </FieldLabel>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="p-3 border rounded-xs">
                    <legend>Campaign Duration</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        control={form.control}
                        name="campaignStartDate"
                        render={({ field, fieldState }) => (
                          <Field
                            className="flex flex-col"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldLabel htmlFor={field.name}>
                              Start Date
                            </FieldLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  aria-invalid={fieldState.invalid}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 rounded-xs"
                                align="start"
                                style={{
                                  zIndex: 99,
                                  position: "relative",
                                  pointerEvents: "auto",
                                }}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        control={form.control}
                        name="campaignEndDate"
                        render={({ field, fieldState }) => (
                          <Field
                            className="flex flex-col"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldLabel htmlFor={field.name}>
                              End Date
                            </FieldLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  aria-invalid={fieldState.invalid}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 rounded-xs"
                                align="start"
                                style={{
                                  zIndex: 99,
                                  position: "relative",
                                  pointerEvents: "auto",
                                }}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Categories</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Include Categories */}
                      <Controller
                        control={form.control}
                        name="includeCategories"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Include
                            </FieldLabel>
                            <div className="flex flex-wrap gap-2">
                              <Input
                                placeholder="Type and press Enter to add..."
                                value={includeCategoryInput}
                                onChange={(e) =>
                                  setIncludeCategoryInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleTagInput(
                                    e,
                                    includeCategoryInput,
                                    "includeCategories",
                                    setIncludeCategoryInput
                                  )
                                }
                                aria-invalid={fieldState.invalid}
                              />
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.value?.map((category, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 flex items-center gap-1"
                                  >
                                    {category}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => {
                                        const newCategories =
                                          field.value?.filter(
                                            (_, i) => i !== index
                                          );
                                        form.setValue(
                                          "includeCategories",
                                          (newCategories ?? []) as string[]
                                        );
                                      }}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Exclude Categories */}
                      <Controller
                        control={form.control}
                        name="excludeCategories"
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Exclude
                            </FieldLabel>
                            <div className="flex flex-wrap gap-2">
                              <Input
                                placeholder="Type and press Enter to add..."
                                value={excludeCategoryInput}
                                onChange={(e) =>
                                  setExcludeCategoryInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleTagInput(
                                    e,
                                    excludeCategoryInput,
                                    "excludeCategories",
                                    setExcludeCategoryInput
                                  )
                                }
                                aria-invalid={fieldState.invalid}
                              />
                              <div className="flex flex-wrap gap-2 mt-2">
                                {field.value?.map((category, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1 flex items-center gap-1"
                                  >
                                    {category}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => {
                                        const newCategories =
                                          field.value?.filter(
                                            (_, i) => i !== index
                                          );
                                        form.setValue(
                                          "excludeCategories",
                                          (newCategories ?? []) as string[]
                                        );
                                      }}
                                    />
                                  </Badge>
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
                  </fieldset>

                  {/* Color Preferences */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Color Preferences</legend>
                    <Controller
                      control={form.control}
                      name="campaignRequirements.colorPreferences"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-wrap gap-2">
                            <Input
                              placeholder="Add color (press Enter)"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const value = e.currentTarget.value.trim();
                                  if (value) {
                                    const currentValues = field.value || [];
                                    field.onChange([...currentValues, value]);
                                    e.currentTarget.value = "";
                                  }
                                }
                              }}
                              aria-invalid={fieldState.invalid}
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value?.map((color, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="px-3 py-1 flex items-center gap-1"
                                >
                                  {color}
                                  <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => {
                                      const newColors = field.value?.filter(
                                        (_, i) => i !== index
                                      );
                                      form.setValue(
                                        "campaignRequirements.colorPreferences",
                                        (newColors ?? []) as string[]
                                      );
                                    }}
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </fieldset>
                </div>

                {/* Tracking Requirements */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>Tracking Requirements</legend>
                  <div className="space-y-4">
                    <Controller
                      control={form.control}
                      name="trackingRequirements.requireAnalyticsScreenshots"
                      render={({ field }) => (
                        <Field
                          className="flex items-center space-x-2"
                          orientation="horizontal"
                        >
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel className="mt-0!">
                            Require Analytics Screenshots
                          </FieldLabel>
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="trackingRequirements.requireInsightsAccess"
                      render={({ field }) => (
                        <Field
                          className="flex items-center space-x-2"
                          orientation="horizontal"
                        >
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel className="mt-0!">
                            Require Insights Access
                          </FieldLabel>
                        </Field>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="trackingRequirements.customTrackingParameters"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Custom Tracking Parameters
                          </FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            <Input
                              placeholder="Add parameter (press Enter)"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const value = e.currentTarget.value.trim();
                                  if (value) {
                                    const currentValues = field.value || [];
                                    field.onChange([...currentValues, value]);
                                    e.currentTarget.value = "";
                                  }
                                }
                              }}
                              aria-invalid={fieldState.invalid}
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value?.map((param, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="px-3 py-1 flex items-center gap-1"
                                >
                                  {param}
                                  <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => {
                                      const newParams = field.value?.filter(
                                        (_, i) => i !== index
                                      );
                                      form.setValue(
                                        "trackingRequirements.customTrackingParameters",
                                        (newParams ?? []) as string[]
                                      );
                                    }}
                                  />
                                </Badge>
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
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Platforms */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Preferred Platforms</legend>
                    <Controller
                      control={form.control}
                      name="preferredPlatforms"
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          orientation="horizontal"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4">
                            {[
                              "Instagram",
                              "YouTube",
                              "TikTok",
                              "Facebook",
                              "Twitter",
                              "Linkedin",
                            ].map((platform) => (
                              <div
                                key={platform}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  name={field.name}
                                  checked={field.value?.includes(
                                    platform as
                                      | "Instagram"
                                      | "YouTube"
                                      | "TikTok"
                                      | "Facebook"
                                      | "Twitter"
                                      | "Linkedin"
                                  )}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([
                                        ...currentValues,
                                        platform,
                                      ]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          (val) => val !== platform
                                        )
                                      );
                                    }
                                  }}
                                  aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel
                                  htmlFor={field.name}
                                  className="mt-0!"
                                >
                                  {platform}
                                </FieldLabel>
                              </div>
                            ))}
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </fieldset>

                  {/* Content Types */}
                  <fieldset className="p-3 border rounded-xs">
                    <legend>Content Types</legend>
                    <Controller
                      control={form.control}
                      name="contentTypes"
                      render={({ field, fieldState }) => (
                        <Field orientation="horizontal">
                          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4">
                            {[
                              "Photo",
                              "Video",
                              "Story",
                              "Reel",
                              "Live",
                              "Blog",
                            ].map((type) => (
                              <div
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  name={field.name}
                                  checked={field.value?.includes(
                                    type as
                                      | "Photo"
                                      | "Video"
                                      | "Story"
                                      | "Reel"
                                      | "Live"
                                      | "Blog"
                                  )}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, type]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          (val) => val !== type
                                        )
                                      );
                                    }
                                  }}
                                  aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel
                                  htmlFor={field.name}
                                  className="mt-0!"
                                >
                                  {type}
                                </FieldLabel>
                              </div>
                            ))}
                          </div>
                        </Field>
                      )}
                    />
                  </fieldset>
                </div>

                {/* KPI Metrics  */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>KPI Metrics</legend>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 gap-4 items-end mb-3"
                    >
                      <div className="lg:col-span-5 col-span-12">
                        <Controller
                          control={form.control}
                          name={`kpiMetrics.${index}.metric`}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel htmlFor={field.name}>
                                Metric
                              </FieldLabel>
                              <Input
                                {...field}
                                placeholder="e.g., Views, Engagement"
                              />
                            </Field>
                          )}
                        />
                      </div>

                      <div className="lg:col-span-4 col-span-12">
                        <Controller
                          control={form.control}
                          name={`kpiMetrics.${index}.target`}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Target</FieldLabel>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </Field>
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "col-span-12",
                          index === 0 ? "lg:col-span-3" : "col-span-8"
                        )}
                      >
                        <Controller
                          control={form.control}
                          name={`kpiMetrics.${index}.unit`}
                          render={({ field }) => (
                            <Field>
                              <FieldLabel>Unit</FieldLabel>
                              <Input {...field} placeholder="e.g., K, M" />
                            </Field>
                          )}
                        />
                      </div>

                      {index !== 0 && (
                        <div className="lg:col-span-1 col-span-4 text-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ metric: "", target: 0, unit: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </fieldset>

                {/* // Campaign Requirements  */}
                <fieldset className="p-3 border rounded-xs">
                  <legend>Campaign Requirements</legend>
                  <div className="space-y-4">
                    <Controller
                      control={form.control}
                      name="campaignRequirements.script"
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Script Requirements</FieldLabel>
                          <Textarea
                            placeholder="Enter script requirements..."
                            className="min-h-[100px] rounded-xs"
                            {...field}
                          />
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="campaignRequirements.productShowcase"
                      render={({ field }) => (
                        <Field
                          className="flex flex-row items-start space-x-3 space-y-0"
                          orientation="horizontal"
                        >
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div className="space-y-1 leading-none">
                            <FieldLabel>Product Showcase Required</FieldLabel>
                            <FieldDescription>
                              Check if the influencer needs to showcase the
                              product
                            </FieldDescription>
                          </div>
                        </Field>
                      )}
                    />
                  </div>
                </fieldset>

                {/* 
                

                // Additional Notes 
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field, fieldState  }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional requirements or notes..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 */}
              </div>
            </ScrollArea>
          </FieldGroup>
        </form>
        <SheetFooter className="flex flex-row justify-end gap-4 mt-0 sm:space-x-0 pb-2">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" className="btn-fill primary">
            Create Campaign
          </Button>
        </SheetFooter>
        {/* 
        <Form {...form}>
        </Form> 
        */}
      </SheetContent>
    </Sheet>
  );
}

export default CampaignDrawer;
