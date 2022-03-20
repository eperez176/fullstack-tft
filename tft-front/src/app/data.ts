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
    character_id: string;
    name:string;
    items: number[];
    rarity:string;
    tier:number;
}

export interface augment {
    name:string;
    num_units:number;
    style:number;
    tier_current:number;
    tier_total:number;
}

export interface participant {
    augment: augment[];
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

export interface summoner {
    accountId:string;
    profileIconId:number;
    revisionDate:number;
    name:string;
    id:string;
    puuid:string;
    summonerLevel:number;
}