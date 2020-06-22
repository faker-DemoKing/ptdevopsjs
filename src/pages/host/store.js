import { observable } from "mobx";
import http from 'libs/http';

class Store {
    @observable records = [];
    @observable zones = [];
    @observable record = {};
    @observable idMap = {};
    @observable isFetching = false;
    @observable formVisible = false;

    @observable f_name;
    @observable f_zone;

    fetchRecords = () => {
        this.isFetching = true;
        return http.get('/api/v1/host')
            .then(({ hosts, zones }) => {
                this.records = hosts;
                this.zones = zones;
                for (let item of hosts) {
                    this.idMap[item.id] = item
                }
            })
            .finally(() => this.isFetching = false)
    };

    showForm = (info = {}) => {
        this.formVisible = true;
        this.record = info
    }
}

export default new Store()
