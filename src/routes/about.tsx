import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, SubPageLayout } from "@/components/business-card";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Swatsi Bongani Ratia" },
      { name: "description", content: "About Swatsi Bongani Ratia, software developer." },
    ],
  }),
});

function AboutPage() {
  return (
    <SubPageLayout title="About Me">
      <AboutSection withId={false} />
    </SubPageLayout>
  );
}
