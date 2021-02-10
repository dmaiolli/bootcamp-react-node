import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  // por enquanto armazenaremos a imagem do usuário dentro da estrutura do nosso app, mas é interessante conforme a aplicação for crescendo, utilizarmos serviços online para isso
  storage: multer.diskStorage({
    // onde vamos jogar os arquivos que o usuário fizer o upload
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      // Callback retorna um erro ou o nome do arquivo, caso esteja tudo ok
      return callback(null, fileName);
    },
  }),
};
