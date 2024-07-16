declare global {
  namespace Express {
    interface User {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

export interface Sample {
}
