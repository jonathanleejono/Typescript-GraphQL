declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      PORT: string;
    }
  }
}

export {};
