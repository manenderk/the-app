export function previewImage(event: Event) {
  return new Promise((resolve, reject) => {
    let imagePreview: string;
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview = reader.result as string;
      const fileObj = {
        file,
        imagePreview
      };
      resolve(fileObj);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
