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
  BSProfile
} from './Types';

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
