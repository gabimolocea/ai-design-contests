export interface Designer {
    id: string;
    name: string;
    avatarUrl: string;
  }
  
  export interface Design {
    id: string;
    title: string;
    imageUrl: string;
    designer: Designer;
    category: string;
    likes: number;
  }
  
  export interface Category {
    id: string;
    name: string;
  }