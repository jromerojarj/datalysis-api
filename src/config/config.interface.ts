interface ApiConfigProps {
  PORT: number;
  PATH: string;
}

interface PosgresdbConfigProps {
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  NAME: string;
}

export interface ConfigProps {
  API: ApiConfigProps;
  DB: PosgresdbConfigProps;
}
