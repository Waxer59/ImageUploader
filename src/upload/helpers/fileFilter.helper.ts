export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (!file) {
    // Si no existe el archivo
    return cb(new Error('File is empty'), false); // parametros del callack 1º error 2º si aceptamos o no el archivo
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'jpeg',];

  if (validExtensions.includes(fileExtension)) {
    return cb(null, true);
  }

  cb(null, false);
};
