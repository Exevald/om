import { Base64 } from 'js-base64';

const getEncryptedText = (text: string) => {
    return Base64.encode(text)
}

const getDecryptedText = (text: string) => {
    return Base64.decode(text)
}

export {getEncryptedText, getDecryptedText}