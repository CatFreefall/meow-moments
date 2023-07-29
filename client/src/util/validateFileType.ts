const validateFileType = (file: File) => {
  const validFileTypes = ["image/*, video/*"];
  const fileType = file.type;
  return validFileTypes.indexOf(fileType) > -1 ? true : false;
};

export default validateFileType;