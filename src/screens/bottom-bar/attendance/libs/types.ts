type Checkin = {latitude: number; longitude: number; time: string};
type ClassItem = {id: string; subject: string; time: string; room?: string; teacher?: string; present?: boolean; checkin?: Checkin};

export type { Checkin, ClassItem };