import Loader, { IForce, ISelection, ICategory, ICost } from './Loader';
import Roster from './Roster';
import Detachment from './Detachment';
import Unit from './Unit';
import Option from './Option';

class Parser {
  async parse(path: string): Promise<Roster> {
    const rosterFile = await new Loader(path).load();

    const roster = new Roster(rosterFile.roster.$.gameSystemName, rosterFile.roster.$.name);

    const {
      roster: { forces, costs, costLimits }
    } = rosterFile;

    forces.forEach(({ force }: { force: IForce[] }) => {
      force.forEach((force: IForce) => {
        const detachment = this.createDetachment(force);
        roster.addDetachment(detachment);
      });
    });

    costs.forEach(({ cost }: { cost: ICost[] }) => {
      cost.forEach((cost: ICost) => {
        roster.addBattleSize({ name: cost.$.name, value: +cost.$.value });
      });
    });

    costLimits.forEach(({ costLimit }: { costLimit: ICost[] }) => {
      costLimit.forEach((cost: ICost) => {
        roster.addMaxBattleSize({ name: cost.$.name, value: +cost.$.value });
      });
    });

    return roster;
  }

  private createDetachment(force: IForce): Detachment {
    const { catalogueName: catalogue, name } = force.$;

    const detachment = new Detachment(name, catalogue);

    force.selections.forEach(({ selection }: { selection: ISelection[] }) => {
      selection.forEach((selection: ISelection) => {
        detachment.addUnit(this.createUnit(selection));
      });
    });

    return detachment;
  }

  private createUnit(selection: ISelection): Unit {
    const { name, customName, customNote: note } = selection.$;

    const category = selection.categories
      ?.reduce((acc: Array<{ primary: boolean; name: string }>, { category }: { category: ICategory[] }) => {
        category.forEach(({ $: { primary, name } }: { $: { primary: string; name: string } }) => {
          acc.push({ primary: primary === 'true', name });
        });
        return acc;
      }, [])
      .find((category: { primary: boolean; name: string }) => !!category.primary);

    const unit = new Unit(name, category?.name, customName, note);

    selection.selections?.forEach(({ selection }: { selection: ISelection[] }) => {
      selection.forEach((selection: ISelection) => {
        unit.addOption(this.createOption(selection));
      });
    });

    return unit;
  }

  private createOption(selection: ISelection): Option {
    const option = new Option(selection.$.name);

    selection.selections?.forEach(({ selection }: { selection?: ISelection[] }) => {
      selection?.forEach((selection: ISelection) => {
        option.addOption(this.createOption(selection));
      });
    });

    return option;
  }
}

export default new Parser();
