import { Subject } from 'rxjs';
import DamageFactory from '../factories/DamageFactory';


class DataService {
    static instance = null;

    data = null;
    subjectData;
    damageFactory = null;

    constructor() {
        this.subjectData = new Subject();
    }

    static getInstance() {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    setData(data) {
        this.data = data;

        if (this.data != null) {
            this.damageFactory = new DamageFactory(this.data);

            let maxLength = this.getDataEnd();
            for (const hunter of this.data.hunters) {
                if (hunter.total_damages.length < maxLength) {
                    hunter.total_damages = Array.from(Array(maxLength - hunter.total_damages.length).keys()).map(() => 0).concat(hunter.total_damages);
                }

                if (hunter.physical_damages.length < maxLength) {
                    hunter.physical_damages = Array.from(Array(maxLength - hunter.physical_damages.length).keys()).map(() => 0).concat(hunter.physical_damages);
                }

                if (hunter.elemental_damages.length < maxLength) {
                    hunter.elemental_damages = Array.from(Array(maxLength - hunter.elemental_damages.length).keys()).map(() => 0).concat(hunter.elemental_damages);
                }

                if (hunter.hits.length < maxLength) {
                    hunter.hits = Array.from(Array(maxLength - hunter.hits.length).keys()).map(() => 0).concat(hunter.hits);
                }

                if (hunter.criticals.length < maxLength) {
                    hunter.criticals = Array.from(Array(maxLength - hunter.criticals.length).keys()).map(() => 0).concat(hunter.criticals);
                }
            }
        } else {
            this.damageFactory = null;
        }

        this.subjectData.next(data);
    }

    getData() {
        return this.data;
    }

    hasData() {
        return this.data !== null;
    }

    getDamageFactory() {
        return this.damageFactory;
    }

    getDataEnd() {
        if (!this.hasData() == null || this.damageFactory == null) {
            return 0;
        } 

        return this.damageFactory.getDataEnd();
    }
}

export default () => {
    return DataService.getInstance();
}