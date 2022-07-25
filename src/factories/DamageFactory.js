/**
 * Description: Factory to create damage objects from data.
 * 
 * @param {Object} data Data to create damage objects from.
 * @returns {Object} {labels: [], datasets: [{label: '', data: []}]}
 */

const COLORS = [
    "#ff595e",
    "#ffca3a",
    "#8ac926",
    "#1982c4"
]

export default class DamageFactory {
    data = null;

    constructor(data) {
        this.data = data;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    hasData() {
        return this.data !== null;
    }

    getDataEnd() {
        if (this.data == null) {
            return 0;
        }

        if (this.data.hunters.length > 0) {
            return this.data.hunters[0].total_damages.length;
        }

        return 0;
    }

    getTotalDamages() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let end = this.getDataEnd();
        let labels = [];
        let datasets = [];

        for (let i = 0; i < end; i++) {
            let text = i + 's';

            if (i > 60) {
                text = Math.floor(i / 60) + 'm' + (i % 60) + 's';
            }

            labels.push(text);
        }

        for (const hunterDamage of this.data.hunters) {
            let damages = [];
            let damage = 0;
            for (let i = 0; i < end; i++) {
                damage += hunterDamage.total_damages[i];
                damages.push(damage);
            }
            datasets.push({
                label: hunterDamage.name,
                data: damages,
                borderColor: this.getColor(hunterDamage.id),
                backgroundColor: this.getColor(hunterDamage.id),
                fill: true,
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            });
        }

        return this.buildResult(labels, datasets);
    }

    getGlobalDamages() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let labels = ['Total Damages', 'Physical Damages', 'Elemental Damages'];
        let datasets = [];

        for (const hunterDamage of this.data.hunters) {
            datasets.push({
                label: hunterDamage.name,
                data: [
                    hunterDamage.total_damages.reduce((a, b) => a + b, 0),
                    hunterDamage.physical_damages.reduce((a, b) => a + b, 0),
                    hunterDamage.elemental_damages.reduce((a, b) => a + b, 0)
                ],
                borderColor: this.getColor(hunterDamage.id),
                backgroundColor: this.getColor(hunterDamage.id),
                fill: true,
                pointRadius: 4
            });
        }

        return this.buildResult(labels, datasets);
    }

    getHits() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let labels = this.data.hunters.map(hunterDamage => hunterDamage.name);
        let datasets = [
            {
                label: 'Hits',
                data: this.data.hunters.map(hunterDamage => hunterDamage.hits ? hunterDamage.hits.reduce((a, b) => a + b, 0) : 0),
                backgroundColor: '#8ac926'
            },
            {
                label: 'Criticals',
                data: this.data.hunters.map(hunterDamage => hunterDamage.criticals ? hunterDamage.criticals.reduce((a, b) => a + b, 0) : 0),
                backgroundColor: '#1982c4'
            },
            {
                label: 'Bad Criticals',
                data: this.data.hunters.map(hunterDamage => hunterDamage.bad_criticals ? hunterDamage.bad_criticals.reduce((a, b) => a + b, 0) : 0),
                backgroundColor: '#ff595e'
            }
        ];

        return this.buildResult(labels, datasets);
    }

    getPhysicalBaseDamages() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let end = this.getDataEnd();
        let labels = [];
        let datasets = [];

        for (let i = 0; i < end; i++) {
            let text = i + 's';

            if (i > 60) {
                text = Math.floor(i / 60) + 'm' + (i % 60) + 's';
            }

            labels.push(text);
        }

        for (const hunterDamage of this.data.hunters) {
            let damages = [];
            let damage = 0;
            for (let i = 0; i < end; i++) {
                damage += hunterDamage.base_physical_attacks[i];
                damages.push(damage);
            }
            datasets.push({
                label: hunterDamage.name,
                data: damages,
                borderColor: this.getColor(hunterDamage.id),
                backgroundColor: this.getColor(hunterDamage.id),
                fill: true,
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            });
        }

        return this.buildResult(labels, datasets);
    }

    getPhysicalRates() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let labels = this.data.hunters.map(hunterDamage => hunterDamage.name);
        let datasets = [{
            label: 'Physical Rates',
            data: this.data.hunters.map(hunterDamage => hunterDamage.physical_rates ? hunterDamage.physical_rates.filter(a => a > 0).reduce((a, b) => a + b, 0) / hunterDamage.physical_rates.filter(a => a > 0).length : 0),
            backgroundColor: '#8ac926'
        }];
        
        return this.buildResult(labels, datasets);
    }

    getBaseDps() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let labels = this.data.hunters.map(hunterDamage => hunterDamage.name);
        let data = [];

        for (const hunterDamage of this.data.hunters) {
            if (hunterDamage.base_physical_attacks != null) {
                let startDps = 0;
                for (let index = 0; index < hunterDamage.base_physical_attacks.length; index++) {
                    const element = hunterDamage.base_physical_attacks[index];
                    if (element > 0) {
                        startDps = index;
                        break;
                    }
                }
                data.push(hunterDamage.base_physical_attacks.slice(startDps).reduce((a, b) => a + b, 0) / (hunterDamage.base_physical_attacks.length - startDps));
            } else {
                data.push(0);
            }
        }

        let datasets = [{
            label: 'Base DPS',
            data: data,
            backgroundColor: '#1982c4'
        }];

        return this.buildResult(labels, datasets);
    }

    getEfficiency() {
        if (this.data == null) {
            return this.defaultResult();
        }

        let physicalRates = this.getPhysicalRates();
        let baseDps = this.getBaseDps();

        let labels = physicalRates.labels;
        let datasets = [{
            label: 'Efficiency',
            data: physicalRates.datasets[0].data.map((physicalRate, index) => physicalRate * baseDps.datasets[0].data[index]),
            backgroundColor: '#ff595e'
        }];

        return this.buildResult(labels, datasets);
    }

    buildResult(labels, datasets) {
        return {
            labels: labels,
            datasets: datasets
        };
    }

    defaultResult() {
        return this.buildResult([], []);
    }

    getColor(id) {
        if (id < 0 || id >= COLORS.length) {
            id = 0;
        }
        return COLORS[id];
    }
}