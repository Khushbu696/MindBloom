const crypto = require('crypto');

const KEY = Buffer.from(process.env.ENCRYPTION_KEY || '', 'utf8'); // must be 32 bytes
if (KEY.length !== 32) {
    console.warn('ENCRYPTION_KEY should be 32 bytes long (AES-256).');
}

function encrypt(text) {
    const iv = crypto.randomBytes(12); // recommended for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    // store iv + tag + encrypted (base64)
    return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

function decrypt(data) {
    const b = Buffer.from(data, 'base64');
    const iv = b.slice(0, 12);
    const tag = b.slice(12, 28);
    const encrypted = b.slice(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
