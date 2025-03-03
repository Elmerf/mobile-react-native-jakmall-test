class FetchInstance {
  private baseURL: string;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
  }

  async get<T>(url: string, options?: Omit<RequestInit, "method">): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(
    url: string,
    data: any,
    options?: Omit<RequestInit, "method">,
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async put<T>(
    url: string,
    data: any,
    options?: Omit<RequestInit, "method">,
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async delete<T>(
    url: string,
    options?: Omit<RequestInit, "method">,
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async patch<T>(
    url: string,
    data: any,
    options?: Omit<RequestInit, "method">,
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export { FetchInstance };
