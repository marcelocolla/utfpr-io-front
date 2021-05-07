

/*
// Criptograr:
export function criptografar(data) {    
    const idEncrypted = cryptoJs.AES.encrypt(JSON.stringify({data}), secretKey).toString()

    return idEncrypted
}

// Descriptograr:
export function descriptografar(dataEncrypted) {
     const info2 = crypto.AES.decrypt(dataEncrypted, secretKey).toString(crypto.enc.Utf8);

     console.log({ info2 });
 
     const info3 = JSON.parse(info2);
 
     console.log({ dataEncrypted: info3.dataEncrypted });
}
*/

export function getMemoriaLocal(item) {
     return window.localStorage.getItem(item.toString());
}





  