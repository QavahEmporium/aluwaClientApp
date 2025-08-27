import Link from "next/link";
import { CartIcon } from "../cart/cart-icon";
import Image from "next/image";

const PageHeader = () => {
  return (
    <header className="md:hidden fixed fixed top-0 left-0 right-0 flex justify-between items-center pl-2 pr-6 py-4 border-b border-gray-200 bg-white z-50">
      <Link href="/" className="relative w-[70px] h-[40px]">
        <Image
          src="/images/logo-1.jpg"
          alt="Grooming products logo"
          fill
          className="object-cover"
          priority
        />
      </Link>
      <CartIcon />
    </header>
  );
};

export default PageHeader;
