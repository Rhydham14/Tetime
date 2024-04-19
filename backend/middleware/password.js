const Cryptr = require('cryptr');
const cryptr = new Cryptr('AspireSoftserv');

const verfication = ()=>{

    const plaintextPassword = '';
    const encryptedPassword = cryptr.encrypt(plaintextPassword);    
    console.log('Encrypted Password:', encryptedPassword);
    const decryptedPassword = cryptr.decrypt(encryptedPassword);
    console.log('Decrypted Password:', decryptedPassword);
}
export default verfication;
