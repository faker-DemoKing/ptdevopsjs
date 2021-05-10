import { observable } from "mobx";
import http from 'libs/http';

class Store {
  @observable settings = {};
  @observable isFetching = false;
  @observable loading = false;
  @observable acme_dnss = []
  @observable acme_dns_types = [];
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
    http.get('/api/v1/ssl/setting/acme/dns')
      .then(({ acme_dns_types, acme_dnss, perms }) => {
        this.acme_dns_types = acme_dns_types
        this.acme_dnss = acme_dnss
        this.permRecords = acme_dnss.filter(item => perms.includes(item.id));
        // localStorage.setItem('acme_permRecords', this.permRecords);
      })
      .finally(() => this.isFetching = false)
  };
  // fetchSortAcme = (acme_dns_type) => {
  //   this.sortAcmes = this.permRecords.filter(item => item.type === acme_dns_type)
  //   return this.sortAcmes
  // }
  showAcmeForm = (info = {}) => {
    this.formVisible = true;  
    this.record = info
  }
}

export default new Store()
