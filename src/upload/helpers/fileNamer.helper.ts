import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) {
    // Si no existe el archivo
    return cb(new Error('File is empty'), false); // parametros del callack 1º error 2º si aceptamos o no el archivo
  }

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtension}`;

  cb(null, fileName);
};
