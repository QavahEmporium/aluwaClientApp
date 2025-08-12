import Link from "next/link";
import { CartIcon } from "../cart/cart-icon";

const PageHeader = () => {
  return (
    <header className="md:hidden fixed fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white z-50">
      <Link href="/" className="text-lg font-bold">
        My Shop
      </Link>
      <CartIcon />
    </header>
  );
};

export default PageHeader;
