import Link from "next/link";

export default function Home() {
  return (
    <div className="p-20 max-w-16">
      <Link href="/user-management">manage users</Link>
    </div>
  );
}
