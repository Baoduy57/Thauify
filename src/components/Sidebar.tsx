import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20 animate-fade-in">
      <Card className="border-border/50 hover:border-primary/20 transition-all duration-200 shadow-sm hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center group"
            >
              <Avatar className="w-20 h-20 border-2 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-200">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold group-hover:text-primary/90 transition-colors duration-200">
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary/60 transition-colors duration-200">
                  {user.username}
                </p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20 animate-fade-in">
    <Card className="border-border/50 hover:border-primary/20 transition-all duration-200 shadow-sm hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold gradient-text">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4 leading-relaxed">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button
            className="w-full hover:bg-primary/90 transition-all duration-200"
            variant="outline"
          >
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button
            className="w-full mt-2 transition-all duration-200 shadow-md"
            variant="default"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
