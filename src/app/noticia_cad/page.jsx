"use client";

import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    titulo: yup.string()
        .min(1, 'O titulo da notícia deve possuir, no mínimo, 1 caracteres')
        .max(50, 'O titulo da notícia deve possuir, no máximo, 50 caracteres')
        .required('O titulo da notícia é obrigatório'),

    subTitulo: yup.string()
        .min(10, 'O sub titulo da notícia deve possuir, no mínimo, 10 caracteres')
        .max(100, 'O sub titulo da notícia deve possuir, no máximo, 100 caracteres')
        .required('O sub titulo da é obrigatório'),

    noticia: yup.string()
    .required('A notícia é obrigatória'),

}).required();

const NoticiaCad = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-2">
      <h2>Cadastro de Notícia</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-floating mt-2">                
          <input type="text" className="form-control" {...register("titulo")}/>
          <label>Título</label>
          <span className='text-danger'>{errors.titulo?.message}</span>
        </div>

        <div className="form-floating mt-2">                
          <input type="text" className="form-control" {...register("subTitulo")}/>
          <label>Sub Título da Notícia</label>
          <span className='text-danger'>{errors.subTitulo?.message}</span>
        </div>

        <div className="form-floating mt-2">
          <textarea style={{height: '500px'}} className="form-control" {...register('noticia')} />
          <label>Notícia</label>
          <span className="text-danger">{errors.noticia?.message}</span>
        </div>

        <Button type="submit" variant="primary">
          Salvar
        </Button>

      </form>
      
    </div>
  );
};

export default NoticiaCad;
