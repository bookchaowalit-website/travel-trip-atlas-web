import { HomeView } from "@/components/atlas-views";
import { routes } from "@/lib/trip-atlas";

export default function Home() {
  return <HomeView routes={routes} />;
}
