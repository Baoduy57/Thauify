import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="border-border/50 hover:border-primary/20 transition-all duration-200 shadow-sm hover:shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="gradient-text">Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`} className="group">
                  <Avatar className="ring-2 ring-border group-hover:ring-primary/30 transition-all duration-200">
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer hover:text-primary/90 transition-colors duration-200"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default WhoToFollow;
