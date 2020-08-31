export type Roster = {
  gameSystemName: string;
  name: string;
  costs: Cost[];
  costLimits: Cost[];
  forces: Force[];
};

export type BSRoster = {
  $: {
    gameSystemName: string;
    name: string;
  };

  costs: [
    {
      cost: BSCost[];
    }
  ];

  costLimits: [
    {
      costLimit: BSCost[];
    }
  ];

  forces: [
    {
      force: BSForce[];
    }
  ];
};

export type Cost = {
  value: number;
  name: CostType;
};

export type BSCost = {
  $: {
    value: string;
    name: BSCostType;
  };
};

export enum CostType {
  PL = 'PL',
  PTS = 'pts',
  CP = 'CP'
}

export enum BSCostType {
  PL = ' PL',
  PTS = 'pts',
  CP = 'CP'
}

export type Force = {
  name: string;
  catalogueName: string;
  publications: string[];
  categories: Category[];
  forces: Force[];
  selections: Selection[];
  rules: Rule[];
};

export type BSForce = {
  $: {
    name: string;
    catalogueName: string;
  };

  publications: Array<{ publication: Array<{ $: { name: string } }> } | string>;
  categories: Array<{ category: BSCategory[] } | string>;
  selections: Array<{ selection: BSSelection[] } | string>;
  forces: Array<{ force: BSForce[] } | string>;
  rules: Array<{ rule: BSRule[] } | string>;
};

export type Category = {
  primary: boolean;
  name: string;
};

export type BSCategory = {
  $: {
    primary: string;
    name: string;
  };
};

export type Selection = {
  number: number;
  type: 'upgrade' | 'unit' | 'model';
  customName?: string;
  customNotes?: string;
  name: string;
  costs: Cost[];
  categories: Category[];
  selections: Selection[];
  rules: Rule[];
  profiles: Profile<TypeName>[];
};

export type BSSelection = {
  $: {
    number: string;
    type: 'upgrade' | 'unit' | 'model';
    customName?: string;
    customNotes?: string;
    name: string;
  };
  costs: Array<{ cost: BSCost[] } | string>;
  categories: Array<{ category: BSCategory[] } | string>;
  selections: Array<{ selection: BSSelection[] } | string>;
  rules: Array<{ rule: BSRule[] } | string>;
  profiles: Array<{ profile: BSProfile<BSCharacteristic>[] } | string>;
};

export type Rule = {
  name: string;
  description: string;
};

export type BSRule = {
  $: {
    name: string;
  };

  description: string[];
};

export interface Profile<T extends TypeName> {
  typeName: T;
  name: string;
}

export enum TypeName {
  ABILITY = 'Ability',
  UNIT = 'Unit',
  WEAPON = 'Weapon',
  WOUND_TRACK = 'Wound Track',
  TRANSPORT = 'Transport',
  PSYCHIC_POWER = 'Psychic Power',
  PSYKER = 'Psyker',
  EXPLOSION = 'Explosion',
  UNKNOWN = 'Unknown'
}

export interface AbilityProfile extends Profile<TypeName.ABILITY> {
  description: string;
}

export interface UnitProfile extends Profile<TypeName.UNIT> {
  movement: string;
  weaponSkill: string;
  ballisticSkill: string;
  strength: string;
  toughness: string;
  wounds: string;
  attacks: string;
  leadership: string;
  save: string;
}

export interface WeaponProfile extends Profile<TypeName.WEAPON> {
  range: string;
  type: string;
  strength: string;
  armourPenetration: string;
  damage: string;
  abilities: string;
}

export interface WoundTrackProfile extends Profile<TypeName.WOUND_TRACK> {
  remainingWounds: string;
  [key: string]: string;
}

export interface TransportProfile extends Profile<TypeName.TRANSPORT> {
  capacity: string;
}

export interface PsychicPowerProfile extends Profile<TypeName.PSYCHIC_POWER> {
  warpCharge: string;
  range: string;
  details: string;
}

export interface PsykerProfile extends Profile<TypeName.PSYKER> {
  cast: string;
  deny: string;
  powersKnown: string;
  other?: string;
}

export interface ExplosionProfile extends Profile<TypeName.EXPLOSION> {
  diceRoll: string;
  distance: string;
  mortalWounds: string;
}

export interface UnknownProfile extends Profile<TypeName.UNKNOWN> {
  unexpectedTypeName: string;
  [key: string]: string;
}

export interface BSProfile<T extends BSCharacteristic> {
  $: {
    typeName: BSTypeName;
    name: string;
  };
  characteristics: Array<{ characteristic: T[] } | string>;
}

export enum BSTypeName {
  WEAPON = 'Weapon',
  UNIT = 'Unit',
  ABILITIES = 'Abilities',
  WOUND_TRACK = 'Wound Track',
  TRANSPORT = 'Transport',
  PSYCHIC_POWER = 'Psychic Power',
  PSYKER = 'Psyker',
  EXPLOSION = 'Explosion'
}

export interface BSCharacteristic {
  $: {
    name: string;
  };
  _?: string;
}

export interface BSWeaponCharacteristic extends BSCharacteristic {
  $: {
    name: 'Range' | 'Type' | 'S' | 'AP' | 'D' | 'Abilities';
  };
}

export interface BSUnitCharacteristic extends BSCharacteristic {
  $: {
    name: 'M' | 'WS' | 'BS' | 'S' | 'T' | 'W' | 'A' | 'Ld' | 'Save';
  };
}

export interface BSAbilitiesCharacteristic extends BSCharacteristic {
  $: {
    name: 'Description';
  };
}

export interface BSWoundTrackCharacteristic extends BSCharacteristic {
  $: {
    name:
      | 'Remaining W'
      | 'Characteristic 1'
      | 'Characteristic 2'
      | 'Characteristic 3'
      | 'Characteristic 4'
      | 'Characteristic 5'
      | 'Characteristic 6'
      | 'Characteristic 7'
      | 'Characteristic 8'
      | 'Characteristic 9';
  };
}

export interface BSTransportCharacteristic extends BSCharacteristic {
  $: {
    name: 'Capacity';
  };
}

export interface BSPsychicPowerCharacteristic extends BSCharacteristic {
  $: {
    name: 'Warp Charge' | 'Range' | 'Details';
  };
}

export interface BSPsykerCharacteristic extends BSCharacteristic {
  $: {
    name: 'Cast' | 'Deny' | 'Powers Known' | 'Other';
  };
}

export interface BSExplosionCharacteristic extends BSCharacteristic {
  $: {
    name: 'Dice roll' | 'Distance' | 'Mortal wounds';
  };
}

export type CalculatedCosts = { [CostType.PTS]: number; [CostType.PL]: number; [CostType.CP]: number };
