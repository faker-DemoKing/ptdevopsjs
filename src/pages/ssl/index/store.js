import { observable } from "mobx";
import http from 'libs/http';

class Store {
    @observable records = [];
    @observable ssl_types = [];
    @observable record = {};
    @observable permRecords = [];
    @observable idMap = {};
    @observable isFetching = false;
    @observable formVisible = false;
    @observable acmeFormVisible = false;
    @observable acmeRecord = [];

    @observable f_name;
    @observable f_type;
    @observable f_expiration;

    fetchRecords = () => {
        this.isFetching = true;
        return http.get('/api/v1/ssl')
            .then(({ ssl_types, ssls, perms }) => {
                this.records = ssls;
                this.ssl_types = ssl_types;
                this.permRecords = ssls.filter(item => perms.includes(item.id));
                for (let item of ssls) {
                    this.idMap[item.id] = item
                }
            })
            .finally(() => this.isFetching = false)
    };


    showForm = (info = {}) => {
        this.formVisible = true;
        this.record = info
    }

    showAcmeForm = (info = {}) => {
        this.acmeFormVisible = true;
        this.acmeRecord = info
    }

}

export default new Store()
