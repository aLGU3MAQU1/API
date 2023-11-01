import { connection } from "./connection.js";

export async function DeletProd(ID) {
    const comando = `
        DELETE FROM TB_PRODUTO
            WHERE   ID_PRODUTO = ?
    
    `

    const [resp] = await connection.query(comando, [ID]);
    return resp.affectedRows;

}

export async function ChangeProd(produto, id) {
    const comando = `
        UPDATE TB_PRODUTO
        SET
            ID_PRODUTOS             = ?, 
            ID_CATEGORIA            = ?,
            NM_PRODUTO              = ?,
            DS_PRECO                = ?,
            DS_PRECO_PROMOCIONAL    = ?,
            BT_DESTAQUE             = ?,
            BT_PROMOCAO             = ?,
            BT_DISPONIVEL           = ?,
            QTD_ESTOQUE             = ?,
            DS_DETALHES             = ?
        WHERE ID_INSTRUMENTOS = ?
    `

    const [resp] = await connection.query(comando, [
        USER.CATEGORIA,
        USER.PRODUTO,
        USER.PRECO,
        USER.PRECO_PROMOCIONAL,
        USER.DESTAQUE,
        USER.PROMOCAO,
        USER.DISPONIVEL,
        USER.ESTOQUE,
        USER.DETALHE
    ])

    return resp.affectedRows;
}

export async function insertProd(produto) {
    const comando = `
    INSERT INTO TB_PRODUTO (ID_PRODUTO, ID_CATEGORIA, NM_PRODUTO, DS_PRECO, DS_PRECO_PROMOCIONAL, BT_DESTAQUE, BT_PROMOCAO, BT_DISPONIVEL, QTD_ESTOQUE, DS_DETALHES) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    
    `

    const [resp] = await connection.query(comando,
        [

            USER.MARCAS,
            USER.CATEGORIA,
            USER.PRODUTO,
            USER.PRECO,
            USER.PRECO_PROMOCIONAL,
            USER.DESTAQUE,
            USER.PROMOCAO,
            USER.DISPONIVEL,
            USER.ESTOQUE,
            USER.DETALHE


        ]);


    return resp


}


export async function  ChangeProd(imagem, id) {
    const comando = `
        INSERT INTO TB_PRODUTO_IMAGEM (IMG_PRODUTO)
            values( ? )
    
    `
    const [resp] = await connection.query(comando, [
        imagem.imagem, 
        id
    ]);
    return resp;

}


export async function ShowAll() {
    const comando = `

    select  ID_PRODUTOS             AS PRODUTOS,
            ID_CATEGORIA            AS CATEGORIAS,
            NM_PRODUTO              AS PRODUTO,
            DS_PRECO                AS PRECO,
            DS_PRECO_PROMOCIONAL    AS PRECOPRO,
            BT_DESTAQUE             AS DESTAQUE,
            BT_PROMOCAO             AS PROMO,
            BT_DISPONIVEL           AS DISPONIVEL,
            QTD_ESTOQUE             AS ESTOQUE,
            DS_DETALHES             AS DETALHE

    from    TB_PRODUTO
    
    
    `

    let [resp] = await connection.query(comando)
    return resp;

}

export async function ShowAllName(nome) {
    const comando = `

    select  ID_PRODUTOS             AS PRODUTOS,
            ID_CATEGORIA            AS CATEGORIAS,
            NM_PRODUTO              AS PRODUTO,
            DS_DETALHES             AS DETALHE

    from    TB_PRODUTO
    where NM_PRODUTO LIKE ?
    
    
    `

    let [resp] = await connection.query(comando, ['%' + nome + '%'])
    return resp;

}