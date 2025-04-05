import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return <header className="top-0 w-full z-[100] bg-tinnova-primary-blue shadow-sm">
        <nav className="flex justify-between items-center h-16 container">
            <Link href={'/list'}>
                <Image src={'/assets/LOGO_TINNOVA.png'} alt="Logo Tinnova" width={150} height={150} priority />
            </Link>
            <div className="flex gap-14 text-white">
                <Link href={'/list'}>Lista</Link>
                <Link href={'/register'}>Cadastro</Link>
            </div>
        </nav>
    </header>
}