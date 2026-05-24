import { createFileRoute } from "@tanstack/react-router";
import { LinksSection, SubPageLayout } from "@/components/business-card";

export const Route = createFileRoute("/links")({
  component: LinksPage,
  head: () => ({
    meta: [
      { title: "My Links — Swatsi Bongani Ratia" },
      { name: "description", content: "Find Swatsi online: LinkedIn, GitHub, portfolio, and resume." },
    ],
  }),
});

function LinksPage() {
  return (
    <SubPageLayout title="My Links">
      <LinksSection withId={false} />
    </SubPageLayout>
  );
}
