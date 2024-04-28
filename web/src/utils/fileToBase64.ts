export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]);
    };

    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file."));
    };

    reader.readAsDataURL(file);
  });
};
