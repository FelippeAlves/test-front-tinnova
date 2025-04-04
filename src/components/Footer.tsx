import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 py-4 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-center text-sm text-gray-600">
                <span>Desenvolvido por&nbsp;</span>
                <Link
                    href="https://github.com/FelippeAlves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    Felippe Alves de Paula <Github data-testid='github-icon' size={16} className="ml-1" />
                </Link>
            </div>
        </footer>
    );
}
