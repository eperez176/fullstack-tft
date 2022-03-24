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

export interface trait {
    name:string;
    num_units:number;
    style:number;
    tier_current:number;
    tier_total:number;
}

export interface participant {
    puuid:string;
    augments: string[];
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

export interface leagueEntry {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType:string;
    ratedTier: string;
    ratedRating: number;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
}

export interface info{
    game_datetime:number;
    game_length: number;
    tft_game_type: string;
    game_version: string;
    queue_id: number;
    tft_set_number: number;
}