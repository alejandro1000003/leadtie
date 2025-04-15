import { Link } from '@inertiajs/react'

export default function Navbar({ className = '' }) {
  return (
<nav>
  <div className="flex flex-row md:flex-col md:items-start">
    <div className="text-white font-bold">CRM</div>
    <Link href="/profile" className="text-gray-300 hover:text-white">
      Profile
    </Link>
    <Link href="/logout" method="post" as="button" className="text-gray-300 hover:text-red-400">
      Logout
    </Link>
  </div>
</nav>

  )
}
