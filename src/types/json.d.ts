// Đảm bảo TypeScript có thể nhận diện các file JSON
declare module "*.json" {
  const value: any;
  export default value;
}