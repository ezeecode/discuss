import { Button } from "@heroui/button";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div className="container flex gap-4 p-2 m-4 border rounded justify-end border-blue-400">
        <form action={actions.signIn}>
          <Button type="submit">Sign Up / Sign In</Button>
        </form>

        <form action={actions.signOut}>
          <Button type="submit">Sign Out</Button>
        </form>
      </div>

      {session?.user ? (
        <div className="container flex gap-4 p-2 m-4 border rounded justify-center border-green-400">
          <p>Welcome {session.user.name}</p>
        </div>
      ) : (
        <div className="container flex gap-4 p-2 m-4 border rounded justify-center border-red-400">
          <p>Not signed in</p>
        </div>
      )}

      <Profile />
    </div>
  );
}
