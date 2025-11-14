import { Profile } from "./profile";
import { FeaturedProducts } from "./featured-products";
import { MoreProducts } from "./more-products";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import influencersData from "../InfluencerData.json";
import { use } from "react";

interface Influencer {
  id: number;
  name: string;
  img: string;
  city: string;
  category: string;
  followers?: string;
  joined?: string;
  about?: string;
  stats?: {
    itemsSold: number;
    rating: number;
  };
  tags?: string[];
}

// Import your JSON data with proper typing
const influencers: Influencer[] = influencersData;

export default async function InfluencerDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const influencer = influencers.find((i) => i.id === Number(id));

  if (!influencer) {
    notFound();
  }

  return (
    <ContentLayout title="">
      <div className="flex flex-col md:flex-row min-h-screen ">
        <Profile influencer={influencer} />
        <main className="flex-1 p-4 md:p-6">
          <FeaturedProducts />
          <MoreProducts />
        </main>
      </div>
    </ContentLayout>
  );
}
