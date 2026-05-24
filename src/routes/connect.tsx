import { createFileRoute } from "@tanstack/react-router";
import { ConnectSection, SubPageLayout } from "@/components/business-card";

export const Route = createFileRoute("/connect")({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Let's Connect — Swatsi Bongani Ratia" },
      { name: "description", content: "Connect on LinkedIn, GitHub, Twitter, Instagram, or email." },
    ],
  }),
});

function ConnectPage() {
  return (
    <SubPageLayout title="Let's Connect">
      <ConnectSection withId={false} />
    </SubPageLayout>
  );
}
