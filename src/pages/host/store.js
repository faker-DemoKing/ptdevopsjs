import { observable } from "mobx";
import http from 'libs/http';

class Store {
    @observable records = []; // 目前没用到，
    @observable zones = [];
    @observable record = {};
    @observable permRecords = []; // 目前使用的这个
    @observable idMap = {};
    @observable isFetching = false;
    @observable formVisible = false;

    @observable f_name;
    @observable f_zone;
    @observable f_host;

    fetchRecords = () => {
        this.isFetching = true;
        return http.get('/api/v1/host/')
            .then(({ hosts, zones, perms }) => {
                this.records = hosts;
                this.zones = zones;
                this.permRecords = hosts.filter(item => perms.includes(item.id));
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
