import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HCLTeach-Bayer
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/doctors"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/appointments"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Health Topics
          </Link>
          <Link
            href="/services"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
