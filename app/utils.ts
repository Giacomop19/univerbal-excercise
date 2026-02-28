export function createAPIUrl(): string {
  return `http://${process.env.EXPO_PUBLIC_SERVER_IP}:${process.env.EXPO_PUBLIC_SERVER_PORT}`;
}

export function fileReader(blob: any): string {
  const fileReaderInstance = new FileReader()
  let fileBlob : string | null | ArrayBuffer = '';
  fileReaderInstance.readAsDataURL(blob)
  fileReaderInstance.onload = () => {
    fileBlob = fileReaderInstance.result
    
  }
  return fileBlob
}
