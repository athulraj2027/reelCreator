import BasicPlanCard from "@/components/pricing/BasicPlanCard";
import PremiumPlanCard from "@/components/pricing/PremiumPlanCard";
import ProPlanCard from "@/components/pricing/ProPlanCard";

export default function Pricing() {
  return (
    <>
      <h1 className="text-7xl text-center  text-white">Pricing</h1>
      <div className="flex flex-wrap justify-around items-center gap-10 sm:gap-4 w-full mt-10">
        <BasicPlanCard />
        <ProPlanCard />
        <PremiumPlanCard />
      </div>
    </>
  );
}
