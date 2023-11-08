import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserType } from "@/types";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import PostsNumber from "./posts-number";
import UserImage from "./user-image";
import UserName from "./user-name";

type Props = { user: UserType };

export default async function ProfileCard({ user }: Props) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserType;

  return (
    <div className="flex flex-col items-center gap-8 border-b-2 pb-6 text-center sm:flex-row sm:text-start">
      <UserImage user={user} />
      <div className="space-y-3">
        <UserName userSession={userSession} user={user} />
        <Suspense fallback={<Loader2 className="animate-spin text-base" />}>
          <PostsNumber userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}
