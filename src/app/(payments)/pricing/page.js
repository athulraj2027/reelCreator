import BasicPlanCard from "@/components/pricing/BasicPlanCard";
import PremiumPlanCard from "@/components/pricing/PremiumPlanCard";
import ProPlanCard from "@/components/pricing/ProPlanCard";

export default function Pricing() {
  return (
    <>
      <h1 className="text-7xl text-center  text-green-300 font-extrabold">Pricing</h1>
      <div className="flex flex-wrap m-auto justify-center items-center gap-10 sm:gap-4 w-full mt-10">
        <BasicPlanCard />
        <ProPlanCard />
        <PremiumPlanCard />
      </div>
    </>
  );
}
