import { Router } from "express";
import { ChangeIMG, ChangeProd, DeleteProd, ShowAllName, ShowAllProd, InsertProd } from "../repository/produtoRepository.js";
import { LookForID, ListBrands } from "../repository/marcasRepository.js";

import multer from 'multer'

const upload = multer({ dest: 'storage/fotosProdutos' })
const server = Router();

server.get('/produto/nome', async (req, resp) =>{
    try {
        const nome = req.query.nome;
        const resp = await ShowAllName(nome);
        resp.send(resp);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

});



server.get('/produto/marca', async (req, resp) => {
    let r = await ListBrands();
    resp.send(r)
});



server.delete('/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await DeleteProd(id);
        if (resposta != 1)
            throw new Error('Tarefa não pode ser removida')
        
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


});



server.post('/produto', async (req,resp) =>{
    try {
        
        const produto = req.body;
        const resposta = await InsertProd(produto);

        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: 'erro'
        
        })
        
    }

});



server.put('/produto/:id', async (req, resp) =>{
    try {
        const { id } = req.params;
        const produto = req.body;

        const resposta = await ChangeProd(produto, id);
        if (resposta != 1)
            throw new Error('produto não pode ser alterado')
        else
            resp.status(204).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: 'erro'
        })
    }

});





server.get('/produto', async (req, resp) =>{

    try {
        
        const resposta = await ShowAllProd();
        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: 'erro'
        })
    }
});



server.post('/produto/:id/imagem', upload.single('produtos') , async (req, resp) =>{
    try {
        const { id } = req.params;
        const imagem = req.file.path;
        const resposta = await ChangeIMG(imagem, id)

        if ( resposta != 1)
            throw new Error('Ação inválida')
            resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: 'erro'
        })

    }

});

export default server;