const API_ROOT = 'https://www.yuque.com/api/v2';

export interface YuquePayload<T> {
  data: T;
}

export interface IHelloMessage {
  message: string;
}

export class YuqueAPI {
  private token: string;

  private headers: { [key: string]: string };

  constructor(token: string) {
    this.token = token;
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'yuque-kore',
      'X-Auth-Token': this.token,
    };
  }

  public async hello(): Promise<YuquePayload<IHelloMessage>> {
    const { data } = await this.getResult<IHelloMessage>('/hello');
    return {
      data,
    };
  }

  private async getResult<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<YuquePayload<T>> {
    const response = await fetch(`${API_ROOT}${path}`, {
      method: 'GET',
      headers: this.headers,
      ...options,
    });

    return response.json();
  }
}
