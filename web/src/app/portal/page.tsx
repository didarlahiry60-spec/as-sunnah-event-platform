import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getTraineeFullProfile } from "@/lib/trainee";
import { getSubmissionsByPerson } from "@/lib/submissions";
import { TraineeDashboard } from "@/components/portal/TraineeDashboard";

export const metadata: Metadata = {
  title: "প্রশিক্ষণার্থী পোর্টাল | আস-সুন্নাহ ফাউন্ডেশন",
  description: "আস-সুন্নাহ ফাউন্ডেশন প্রশিক্ষণার্থী ড্যাশবোর্ড, পাঠ্যসামগ্রী, অনলাইন ক্লাস ও ডিজিটাল সনদ।",
};

export default async function PortalPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/login");
  }

  const profile =
    (await getTraineeFullProfile(session.personId)) ||
    (await getTraineeFullProfile(session.mobile));

  if (!profile) {
    redirect("/portal/login");
  }

  const resolvedParams = searchParams ? await searchParams : {};
  const submissions = await getSubmissionsByPerson(session.personId);

  return (
    <TraineeDashboard
      initialProfile={profile}
      initialSubmissions={submissions}
      initialTab={resolvedParams.tab}
    />
  );
}
