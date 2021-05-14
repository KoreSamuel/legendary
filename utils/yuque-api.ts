const API_ROOT = 'https://www.yuque.com/api/v2';
import {
  IDoc,
  IHelloMessage,
  IRepo,
  IUser,
  YuquePayload,
} from '../types/index';

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

  public async getUser(login?: string): Promise<YuquePayload<IUser>> {
    const { data } = await this.getResult<IUser>(
      `/user${login ? `s/${login}` : ''}`,
    );
    return {
      data,
    };
  }

  public async getRepos(login: string): Promise<YuquePayload<IRepo[]>> {
    const { data } = await this.getResult<IRepo[]>(`/users/${login}/repos`);
    return {
      data,
    };
  }

  public async getDocs(namespace: string): Promise<YuquePayload<IDoc[]>> {
    const { data } = await this.getResult<IDoc[]>(`/repos/${namespace}/docs`);
    return {
      data,
    };
  }

  public async getDoc(
    namespace: string,
    slug: string,
  ): Promise<YuquePayload<IDoc>> {
    const { data } = await this.getResult<IDoc>(
      `/repos/${namespace}/docs/${slug}`,
    );
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
