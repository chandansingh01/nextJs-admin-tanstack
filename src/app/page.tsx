import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-full p-4 relative">
      <Link href="/dashboard">
        <h2>Go to dashboard</h2>
      </Link>
    </div>
  );
}
