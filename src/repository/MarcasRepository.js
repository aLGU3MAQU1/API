import { connection } from './connection.js'

export async function LookForID(id) {

    let comando = `
        select * from TB_PRODUTOS where ID_PRODUTO = ?
    
    `
    let [resp] = await connection.query(comando, [id]);
    return resp

};

export async function ListBrands(){
    let comando = `
        select ID_PRODUTO    id,
               NM_PRODUTO     produto
        FROM TB_PRODUTO

    `

    let [resp] = await connection.query(comando);
    return resp;
}