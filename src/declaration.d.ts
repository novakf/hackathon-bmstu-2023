declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'crypto-js';
