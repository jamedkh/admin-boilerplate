// lib/schemas/campaign.ts

import * as z from "zod";

export const CampaignFormSchema = z.object({
  // Basic Campaign Info
  category: z.string().nonempty({
    message: "Please select a campaign category.",
  }),

  // Influencer Criteria
  influencerRegion: z.string().nonempty({
    message: "Please select a region.",
  }),
  influencerLanguage: z.string().nonempty({
    message: "Please select a language.",
  }),
  influencerAgeBracket: z.string().nonempty({
    message: "Please select an age bracket.",
  }),

  // Budget Information
  budgetRange: z.object({
    min: z.number().min(0, "Minimum budget must be 0 or greater."),
    max: z.number().min(0, "Maximum budget must be 0 or greater."),
  }),

  // Categories and Tags
  includeCategories: z.array(z.string()).catch([]),
  excludeCategories: z.array(z.string()).catch([]),
  includeAffinityTags: z.array(z.string()).catch([]),
  excludeAffinityTags: z.array(z.string()).catch([]),

  // KPI Metrics
  kpiMetrics: z
    .array(
      z.object({
        metric: z.string().nonempty("Metric name cannot be empty."),
        // FIX: Replaced deprecated `error` with `message`
        target: z
          .number({
            message: "Target must be a number.",
          })
          .min(0, "Target must be 0 or greater."),
        unit: z.string().optional(),
      })
    )
    .catch([]),

  // Campaign Requirements
  // FIX: Removed `.default()` and made the object `.optional()`.
  // The default values are now handled exclusively in the `defaultCampaignValues` object.
  campaignRequirements: z
    .object({
      script: z.string().optional(),
      productShowcase: z.boolean().optional(), // Removed .default(false)
      colorPreferences: z.array(z.string()).catch([]),
      otherRequirements: z.array(z.string()).catch([]),
    })
    .optional(),

  // Additional Information
  additionalNotes: z.string().optional(),

  // Optional Deadlines
  submissionDeadline: z.date().optional(),
  campaignStartDate: z.date().optional(),
  campaignEndDate: z.date().optional(),

  // Optional Platform Preferences
  preferredPlatforms: z
    .array(
      z.enum([
        "Instagram",
        "YouTube",
        "TikTok",
        "Facebook",
        "Twitter",
        "Linkedin",
      ])
    )
    .catch([]),

  // Optional Content Type Preferences
  contentTypes: z
    .array(z.enum(["Photo", "Video", "Story", "Reel", "Live", "Blog"]))
    .catch([]),

  // Optional Campaign Objectives
  objectives: z.array(z.string()).catch([]),

  // Optional Brand Safety Guidelines
  brandSafetyGuidelines: z.array(z.string()).catch([]),

  // Optional Performance Tracking
  // FIX: Removed `.default()` and made the object `.optional()`.
  trackingRequirements: z
    .object({
      requireAnalyticsScreenshots: z.boolean().optional(),
      requireInsightsAccess: z.boolean().optional(),
      customTrackingParameters: z.array(z.string()).catch([]),
    })
    .optional(),
});

// Type inference
export type CampaignFormValues = z.infer<typeof CampaignFormSchema>;

// Default values (no changes needed here, as it already provides the full structure)
export const defaultCampaignValues: CampaignFormValues = {
  category: "",
  influencerRegion: "",
  influencerLanguage: "",
  influencerAgeBracket: "",
  includeCategories: [],
  excludeCategories: [],
  includeAffinityTags: [],
  excludeAffinityTags: [],
  kpiMetrics: [],
  budgetRange: {
    min: 0,
    max: 0,
  },
  campaignRequirements: {
    script: "",
    productShowcase: false,
    colorPreferences: [],
    otherRequirements: [],
  },
  additionalNotes: "",
  preferredPlatforms: [],
  contentTypes: [],
  objectives: [],
  brandSafetyGuidelines: [],
  trackingRequirements: {
    requireAnalyticsScreenshots: false,
    requireInsightsAccess: false,
    customTrackingParameters: [],
  },
};
