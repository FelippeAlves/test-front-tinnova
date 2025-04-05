'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { maskCPF } from '@/utils/maskCPF';
import { maskPhone } from '@/utils/maskPhone';
import { stripNonNumeric } from '@/utils/stripNonNumeric';
import { addUserToStorage, updateUserInStorage } from '@/storage/userStorage';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';


const registerSchema = z.object({
  name: z.string().min(3, 'Campo deve conter 3 caracteres ou mais'),
  cpf: z.string().min(14, 'CPF inválido').max(14, 'CPF inválido'),
  phone: z.string().min(14, 'Telefone/Celular inválido').max(16),
  email: z.string().email('Email inválido'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  defaultValues?: RegisterFormData & { id: string };
  isEditing?: boolean;
  onSuccess?: () => void;
};


export default function RegisterForm({ defaultValues, isEditing, onSuccess }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues ?? {},
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        cpf: maskCPF(defaultValues.cpf),
        phone: maskPhone(defaultValues.phone),
        email: defaultValues.email,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: RegisterFormData) => {
    const cleanedData = {
      ...data,
      cpf: stripNonNumeric(data.cpf),
      phone: stripNonNumeric(data.phone),
      id: defaultValues?.id || crypto.randomUUID(),
    };

    setLoading(true);

    setTimeout(() => {
      if (isEditing && defaultValues) {
        updateUserInStorage(cleanedData);
        toast.success('Usuário editado com sucesso!');
      } else {
        addUserToStorage(cleanedData);
        toast.success('Cadastro realizado com sucesso!');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        redirect('/list');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-sm border border-[#efeeed] rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-semibold text-[#333333] mb-6 text-center">
          {isEditing ? 'Editar Usuário' : 'Cadastro de Usuário'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            label="Nome"
            placeholder="Nome completo (sem abreviações)"
            {...register('name')}
            error={errors.name?.message}
          />

          <CustomInput
            label="CPF"
            placeholder="Digite o CPF"
            {...register('cpf', {
              onChange: (e) => {
                const masked = maskCPF(e.target.value);
                setValue('cpf', masked);
              },
            })}
            error={errors.cpf?.message}
          />

          <CustomInput
            label="Telefone/Celular"
            placeholder="Digite o número com DDD"
            {...register('phone', {
              onChange: (e) => {
                const masked = maskPhone(e.target.value);
                setValue('phone', masked);
              },
            })}
            error={errors.phone?.message}
          />

          <CustomInput
            label="Email"
            placeholder="Digite o email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Button loading={loading} className="w-full mt-2">
            {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
