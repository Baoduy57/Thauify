import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-2">
      <ModeToggle />

      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            asChild
          >
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <div className="ml-2">
            <UserButton />
          </div>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="default"
            className="hover:scale-105 transition-all duration-300 shadow-md"
          >
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
