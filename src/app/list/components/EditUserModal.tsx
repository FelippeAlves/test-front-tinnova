'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from '@/components/ui/dialog';
import RegisterForm, { RegisterFormData } from '../../register/components/RegisterForm';
import { DialogTitle } from '@radix-ui/react-dialog';

type EditUserModalProps = {
    open: boolean;
    onClose: () => void;
    userToEdit: (RegisterFormData & { id: string }) | null;
    onUserUpdated: () => void;
};

export default function EditUserModal({
    open,
    onClose,
    userToEdit,
    onUserUpdated,
}: EditUserModalProps) {
    if (!userToEdit) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white max-w-lg p-0 overflow-hidden">
                <DialogTitle />
                <DialogHeader className="px-6 pt-6">
                </DialogHeader>

                <div className="p-6 pt-0">
                    <RegisterForm
                        defaultValues={userToEdit}
                        isEditing
                        onSuccess={() => {
                            onUserUpdated()
                            onClose()
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
