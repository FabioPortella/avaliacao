"use client";

import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import zxcvbn from "zxcvbn"; // biblioteca para criação de seha "forte"

const schema = yup.object({
    nome: yup.string()
        .min(2, 'O nome deve possuir, no mínimo, 2 caracteres')
        .max(30, 'O nome deve possuir, no máximo, 30 caracteres')
        .required('O nome do curso é obrigatório'),

    dataNascimento: yup.date()
        .required('A data de nascimento é obrigatória')
        .typeError('A data de nascimento é obrigatória'),

    email: yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),

    senha: yup.string()
        .test("Informe uma Senha-forte", "A senha deve ser forte 8 caracteres com maiúsculo, minúsculo, número e um caractere especial", (value) => {
            const result = zxcvbn(value);
            return result.score >= 3; // pontuação mínima para uma senha ser considerada forte = contém uma combinação de caracteres maiúsculos, minúsculos, números e um caractere especial e comprimento de 8 caracteres.
        })
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

        <div className="form-floating mt-2">                
          <input type="text" className="form-control" {...register("nome")}/>
          <label>Nome</label>
          <span className='text-danger'>{errors.nome?.message}</span>
        </div>

        <div className="form-floating mt-2">
          <input type="date" className="form-control" {...register("dataNascimento")} />
          <label>Data de Nascimento</label>
          <span className="text-danger">{errors.dataNascimento?.message}</span>
        </div>

        <div className="form-floating mt-2">
          <input type="email" className="form-control" {...register("email")} />
          <label>E-mail</label>
          <span className='text-danger'>{errors.email?.message}</span>
        </div>
        

        <div className="form-floating mt-2">
            <input type="password" className="form-control" {...register("senha")} />
            <label>Senha</label>
            <span className='text-danger'>{errors.senha?.message}</span>
        </div>

        <Button type="submit" variant="primary">
          Salvar
        </Button>

      </form>
      
    </div>
  );
};

export default LeitorCad;
