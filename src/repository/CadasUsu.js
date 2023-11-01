import { connection } from "./connection.js";

export async function EditUsua(User, id) {
    const comando = `
        UPDATE TB_CLIENTE
        SET
            ID_CLIENTE              =?,
            NM_CLIENTE              =?,
            DT_NASC                 =?,
            DS_TELEFONE             =?,
            DS_CPF                  =?,
            DS_ENDEREÇO             =?,
            DS_CIDADE               =?,
            DS_EMAIL                =?,
            DS_SENHA                =?

        WHERE ID_CLIENTE               =?
    
    `

    const [resp] = await connection.query(comando, [

        User.NOME,
        User.DATA,
        User.TELEFONE,
        User.CPF,
        User.ENDERECO,
        User.CIDADE,
        User.EMAIL,
        User.SENHA
        

    ])

    return resp.affectedRows;
}

export async function CadasUsua(User) {
    const comando = `
        INSERT INTO TB_CLIENTE( ID_CLIENTE, NM_CLIENTE, DT_NASC, DS_CLIENTE, DS_CPF, DS_ENDEREÇO, DS_CIDADE, DS_EMAIL,  DS_SENHA )
                values(?, ?, ?, ?, ?, ?, ?, ?)

    `
    const [resp] = await connection.query(comando, [

        User.NOME,
        User.DATA,
        User.CPF,
        User.TELEFONE,
        User.EMAIL,
        User.SENHA,
        User.ENDERECO,
        User.CIDADE
        ]);

    usuario.id = resp.insertId

    return resp;

}

export async function DeleUsua(id) {
    const comando = `
        DELETE FROM TB_CLIENTE
        WHERE       ID_CLIENTE = ?

    `;


    const [resp] = await connection.query(comando, [id]);
    return resp.affectedRows

}

export async function LogUsua(email, senha) {
    const comando = `SELECT DS_EMAIL, DS_SENHA
                     FROM TB_CLIENTE
                    WHERE DS_EMAIL = ? AND DS_SENHA = ?
`

    const resp = await connection.query(comando, [email, senha]);

    const linhas = resp[0];
    const linha = linhas[0];



    return linha;
}