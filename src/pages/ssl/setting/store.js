import { observable } from "mobx";
import http from 'libs/http';

class Store {
  @observable settings = {};
  @observable isFetching = false;
  @observable loading = false;
  @observable acmes = []
  @observable acme_types = [];
  @observable showHost = false;
  @observable record = {}
  @observable formVisible = false;
  @observable permRecords = [];
  @observable sortAcmes = [];
  
  @observable f_type;
  @observable f_user;
  @observable f_key;

  fetchAcmeSettings = () => {
    this.isFetching = true;
    http.get('/api/v1/ssl/setting/acme')
      .then(({ acme_types, acmes, perms }) => {
        this.acme_types = acme_types
        this.acmes = acmes
        this.permRecords = acmes.filter(item => perms.includes(item.id));
        localStorage.setItem('acme_permRecords', this.permRecords);
      })
      .finally(() => this.isFetching = false)
  };
  fetchSettings(){
    
  }
  fetchSortAcme = (acme_type) => {
    this.sortAcmes = this.permRecords.filter(item => item.type === acme_type)
    return this.sortAcmes
  }
  showAcmeForm = (info = {}) => {
    this.formVisible = true;  
    this.record = info
  }
}

export default new Store()
