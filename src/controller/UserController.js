import { Router } from 'express';
import { CadaUsu, EditUsu, DeleUsu, LogUsu } from '../repository/CadastroUsuario.js';

const server = Router();



server.post('/cliente/login', async (req, resp) =>{
    try {
        const email = req.body.EMAIL;
        const senha = req.body.SENHA;

        const linha = await LogUsu(email, senha);
        if (linha == undefined){
            throw new Error('Inválida')

        }

        resp.send(linha)
    } catch (err) {
        resp.status(400).send({
            erro: err.message

        })
    }

});

server.put('/cliente/editar/:id', async (req, resp) =>{

    try {
        const { id } = req.params;
        const usuario = req.body;

        const resposta = await EditUsu(usuario, id)

        if (resposta != 1)
        throw new Error('usuario não pode ser alterado');
    else
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message

        })
    }
});

server.post('/cliente', async (req, resp) => {

    try {
        const user = req.body

        if (!user.NOME)
            throw new Error('Campo obrigatório')
        if (!user.DATA)
            throw new Error('Campo obrigatório')
        if (!user.TELEFONE)
            throw new Error('Campo obrigatório')
        if (!user.CPF)
            throw new Error('Campo obrigatório')
        if (!user.ENDERECO)
            throw new Error('Campo obrigatório')
        if (!user.CIDADE)
            throw new Error('Campo obrigatório')
        if (!user.EMAIL)
            throw new Error('Campo obrigatório')
        if (!user.SENHA)
            throw new Error('Campo obrigatório')

        const resposta = await CadaUsu(user)



        resp.send(res)
    } catch (err) {
        resp.status(400).send({
            erro: err.message

        })
    }
});

server.delete('/cliente/delete/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        const resposta = await DeleUsu(id);
        if (resposta != 0) {

            throw new Error('Usuario não existe')
        }

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message

        })
    }

});


export default server;