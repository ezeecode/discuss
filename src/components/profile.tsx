"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession();

    if (session.data?.user) {
        return (
            <div className="container flex gap-4 p-2 m-4 border rounded justify-center border-green-600">
                <p>From Client : User {session.data.user.name} signed in</p>
            </div>
        ); 
    }

    return (
        <div className="container flex gap-4 p-2 m-4 border rounded justify-center border-red-600">
            <p>From Client : NOT signed in</p>
        </div>
    );
}