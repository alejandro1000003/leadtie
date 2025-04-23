import { Link } from '@inertiajs/react';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-red-600 text-xl font-semibold gap-4">
      <p>401 - You are not authorized to view this page.</p>
      <Link href="/login" className="text-blue-600 underline">
        Try to log in again
      </Link>
    </div>
  );
}
