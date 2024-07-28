interface Admin {
  budgetId: string;
  userId: string;
}

export interface Member {
  budgetId: string;
  userId: string;
}

export interface Budget {
  id: string;
  title: string;
  amount: number;
  description: string;
  isFrozen: boolean;
  currencyId: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  endAt: string;
  admins: Admin[];
  members: Member[];
  expenses: number;
}

export interface InviteMemberDto {
  email: string;
}
