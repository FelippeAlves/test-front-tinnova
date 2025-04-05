import Link from 'next/link';
import ClientList from './components/ClientList';
import Button from '@/components/ui/Button/Button';

export default async function ListPage() {

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Usuários Cadastrados</h1>
            <ClientList />
            <div className="flex items-center mb-6 mt-6">
                <Link href="/register">
                    <Button>Novo cadastro</Button>
                </Link>
            </div>
        </main>
    );
}
