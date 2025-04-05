'use client';

import Button from '@/components/ui/Button/Button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

type ConfirmDeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
};

export default function ConfirmDeleteModal({
    open,
    onClose,
    onConfirm,
    userName,
}: ConfirmDeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white flex flex-col">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
                </DialogHeader>

                <p className="text-gray-600">
                    Esta ação irá remover o usuário <strong>{userName}</strong>. Deseja continuar?
                </p>

                <DialogFooter className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variantColor='danger' onClick={onConfirm}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
