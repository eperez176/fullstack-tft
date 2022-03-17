export interface match {
    augment: string;
    gold_left: number;
    last_round: number;
    level: number;
    placement: number;
    players_eliminated: number;
    time_eliminated: number;
    units:champion[];  
}

export interface champion {
    name: string;
    items: number[];
    rarity:string;
    tier:number;
}

export interface participant {
    augment: string[];
    gold_left: number;
    last_round: number;
    level: number;
    placement: number;
    players_eliminated: number;
    time_eliminated: number;
    total_damage_to_players: number;
    traits:string[];
    units:champion[];
}