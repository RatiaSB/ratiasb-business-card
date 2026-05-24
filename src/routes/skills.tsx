import { createFileRoute } from "@tanstack/react-router";
import { SkillsSection, SubPageLayout } from "@/components/business-card";

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
  head: () => ({
    meta: [
      { title: "Skills — Swatsi Bongani Ratia" },
      { name: "description", content: "Technical skills: HTML, CSS, JavaScript, React, Node.js, and more." },
    ],
  }),
});

function SkillsPage() {
  return (
    <SubPageLayout title="Skills">
      <SkillsSection withId={false} />
    </SubPageLayout>
  );
}
