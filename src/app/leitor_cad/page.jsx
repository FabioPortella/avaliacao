"use client";

import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    nome: yup.string()
        .min(2, 'O nome deve possuir, no mínimo, 2 caracteres')
        .max(100, 'O nome deve possuir, no máximo, 100 caracteres')
        .required('O nome do curso é obrigatório'),

    dataNascimento: yup.date()
        .required('A data de nascimento é obrigatória')
        .typeError('A data de nascimento é obrigatória'),

    email: yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),

    senha: yup.string()
        .min(6, 'A senha deve possuir, no mínimo, 6 caracteres')
        .max(20, 'A senha deve possuir, no máximo, 20 caracteres')
        .required('A senha é obrigatória'),

}).required();

const LeitorCad = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-2">
      <h2>Cadastro de Leitores</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label className="row mt-2">
          Nome
          <input type="text" className="form-control" {...register("nome")} />
          <span className="text-danger">{errors.nome?.message}</span>
        </label>

        <label className="row mt-2">
          Data de Nascimento
          <input type="date" className="form-control" {...register("dataNascimento")} />
          <span className="text-danger">{errors.inicio?.message}</span>
        </label>

        <label className='row mt-2'>
            E-mail
            <input type="email" className="form-control" {...register("email")} />
            <span className='text-danger'>{errors.email?.message}</span>
        </label>

        <label className='row mt-2'>
            Senha
            <input type="password" className="form-control" {...register("senha")} />
            <span className='text-danger'>{errors.senha?.message}</span>
        </label>

        <Button type="submit" variant="primary">
          Salvar
        </Button>

      </form>
    </div>
  );
};

export default LeitorCad;
