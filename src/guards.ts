import {
  BSCharacteristic,
  BSWeaponCharacteristic,
  BSTypeName,
  BSUnitCharacteristic,
  BSAbilitiesCharacteristic,
  BSWoundTrackCharacteristic,
  BSTransportCharacteristic,
  BSPsychicPowerCharacteristic,
  BSExplosionCharacteristic,
  BSPsykerCharacteristic,
  BSProfile,
  BSCost,
  BSForce,
  BSRule,
  BSSelection,
  BSCategory,
  LoaderInput
} from './types';

export function isBSForce(bsForces: { force: BSForce[] } | string): bsForces is { force: BSForce[] } {
  return bsForces.hasOwnProperty('force');
}

export function isBSPublication(
  bsPublications: { publication: Array<{ $: { name: string } }> } | string
): bsPublications is { publication: Array<{ $: { name: string } }> } {
  return bsPublications.hasOwnProperty('publication');
}

export function isBSRule(bsRules: { rule: BSRule[] } | string): bsRules is { rule: BSRule[] } {
  return bsRules.hasOwnProperty('rule');
}

export function isBSCategory(
  bsCategories: { category: BSCategory[] } | string
): bsCategories is { category: BSCategory[] } {
  return bsCategories.hasOwnProperty('category');
}

export function isBSSelection(
  bsSelections: { selection: BSSelection[] } | string
): bsSelections is { selection: BSSelection[] } {
  return bsSelections.hasOwnProperty('selection');
}

export function isBSCost(
  bsCosts: { cost: BSCost[] } | { costLimit: BSCost[] } | string
): bsCosts is { cost: BSCost[] } {
  return bsCosts.hasOwnProperty('cost');
}

export function isBSCostLimit(
  bsCostLimits: { cost: BSCost[] } | { costLimit: BSCost[] } | string
): bsCostLimits is { costLimit: BSCost[] } {
  return bsCostLimits.hasOwnProperty('costLimit');
}

export function isBSProfile(
  bsProfiles: { profile: BSProfile<BSCharacteristic>[] } | string
): bsProfiles is { profile: BSProfile<BSCharacteristic>[] } {
  return bsProfiles.hasOwnProperty('profile');
}

export function isBSWeaponProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSWeaponCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.WEAPON;
}

export function isBSUnitProfile(bsProfile: BSProfile<BSCharacteristic>): bsProfile is BSProfile<BSUnitCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.UNIT;
}

export function isBSAbilitiesProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSAbilitiesCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.ABILITIES;
}

export function isBSWoundTrackProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSWoundTrackCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.WOUND_TRACK;
}

export function isBSTransportProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSTransportCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.TRANSPORT;
}

export function isBSPsychicPowerProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSPsychicPowerCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.PSYCHIC_POWER;
}

export function isBSPsykerProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSPsykerCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.PSYKER;
}

export function isBSExplosionProfile(
  bsProfile: BSProfile<BSCharacteristic>
): bsProfile is BSProfile<BSExplosionCharacteristic> {
  return bsProfile.$.typeName === BSTypeName.EXPLOSION;
}

export function isBSCharacteristic(
  bsCharacteristics: { characteristic: BSCharacteristic[] } | string
): bsCharacteristics is { characteristic: BSCharacteristic[] } {
  return bsCharacteristics.hasOwnProperty('characteristic');
}

export function isString(candidate: LoaderInput): candidate is string {
  return typeof candidate === 'string';
}

export function isBuffer(candidate: LoaderInput): candidate is Buffer {
  return Buffer.isBuffer(candidate);
}
