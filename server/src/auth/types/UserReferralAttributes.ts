// userReferralAttributes.ts
export interface UserReferralAttributes {
    id: number;
    referrerId: number;
    referredUserId: number;
    createdAt: Date;
  }
  
  // Tworzymy typ bez 'id' do użycia w procesie tworzenia rekordu
  export type UserReferralCreationAttributes = Omit<UserReferralAttributes, 'id' | 'createdAt'>;
  