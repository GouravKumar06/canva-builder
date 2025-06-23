"use client";

import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import DesignTypes from "@/components/home/design-types";
import Header from "@/components/home/header";
import RecentDesigns from "@/components/home/recentDesigns";
import Sidebar from "@/components/home/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />
          <DesignTypes />
          <AiFeatures />
          <RecentDesigns />
        </main>
      </div>
      {/* <SubscriptionModal
        isOpen={showPremiumModal}
        onClose={setShowPremiumModal}
      />
      <DesignModal
        isOpen={showDesignsModal}
        onClose={setShowDesignsModal}
        userDesigns={userDesigns}
        setShowDesignsModal={setShowDesignsModal}
        userDesignsLoading={userDesignsLoading}
      /> */}
    </div>
  );
}
