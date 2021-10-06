import { LOCALSTORAGE } from '../constants';

const initialList = [
  {
    id: 1,
    key: 1,
    jobTitle: 'Code',
    // time: '17:00:00',
    // fullName: 'Nguyễn Hồng Hữu',
    // dateOfBirth: '22-08-2000',
    // location: 'Hồ Chí Minh',
    // phone: '0379339693',
    // email: 'nguyenhuu220800@gmail.com',
    // currentJob: 'Intern',
    // experience: 'None',
    // note: 'None',
    // idCard: '212589849',
    // workTime: {
    //   startTime: '17:00:00',
    //   finishTime: '18:00:00',
    // },
  },
  {
    id: 2,
    key: 2,
    jobTitle: 'Eat',
    // time: '18:20:00',
    // fullName: 'Đặng Tường Vy',
    // dateOfBirth: '08-04-2001',
    // location: 'Hồ Chí Minh',
    // phone: '0702359976',
    // email: 'dangtuongvy080401@gmail.com',
    // currentJob: 'Student',
    // experience: 'None',
    // note: 'None',
    // idCard: '212589849',
    // workTime: {
    //   startTime: '18:00:00',
    //   finishTime: '19:00:00',
    // },
  },
  {
    id: 3,
    key: 3,
    jobTitle: 'Sleep',
    // time: '20:21:00',
    // fullName: 'Gold',
    // dateOfBirth: '19-07-2014',
    // location: 'Quảng Ngãi',
    // phone: '113',
    // email: 'gold1907@gmail.com',
    // currentJob: 'Student',
    // experience: 'None',
    // note: 'None',
    // idCard: '212589849',
    // workTime: {
    //   startTime: '00:06:06',
    //   finishTime: '06:06:12',
    // },
  },
];

const inititalInfoField = [
  {
    id: 1,
    fields: [
      // {
      //   type: 'text',
      //   name: 'fullName',
      //   label: 'Name',
      // },
      // {
      //   type: 'date',
      //   name: 'dateOfBirth',
      //   label: 'Date of birth',
      // },
      // {
      //   type: 'text',
      //   name: 'location',
      //   label: 'Location',
      // },
      // {
      //   type: 'text',
      //   name: 'phone',
      //   label: 'Phone',
      // },
      // {
      //   type: 'text',
      //   name: 'email',
      //   label: 'Email',
      // },
      // {
      //   type: 'text',
      //   name: 'currentJob',
      //   label: 'Current Job',
      // },
      // {
      //   type: 'text',
      //   name: 'experience',
      //   label: 'Experience',
      // },
      // {
      //   type: 'text',
      //   name: 'note',
      //   label: 'Note',
      // },
      // {
      //   type: 'text',
      //   name: 'idCard',
      //   label: 'ID Card',
      // },
      // {
      //   type: 'time from to',
      //   name: 'workTime',
      //   label: 'Work Time',
      // },
    ],
  },
  {
    id: 2,
    fields: [
      // {
      //   type: 'text',
      //   name: 'fullName',
      //   label: 'Name',
      // },
      // {
      //   type: 'date',
      //   name: 'dateOfBirth',
      //   label: 'Date of birth',
      // },
      // {
      //   type: 'text',
      //   name: 'location',
      //   label: 'Location',
      // },
      // {
      //   type: 'text',
      //   name: 'phone',
      //   label: 'Phone',
      // },
      // {
      //   type: 'text',
      //   name: 'email',
      //   label: 'Email',
      // },
      // {
      //   type: 'text',
      //   name: 'currentJob',
      //   label: 'Current Job',
      // },
      // {
      //   type: 'text',
      //   name: 'experience',
      //   label: 'Experience',
      // },
      // {
      //   type: 'text',
      //   name: 'note',
      //   label: 'Note',
      // },
      // {
      //   type: 'text',
      //   name: 'idCard',
      //   label: 'ID Card',
      // },
      // {
      //   type: 'time from to',
      //   name: 'workTime',
      //   label: 'Work Time',
      // },
    ],
  },
  {
    id: 3,
    fields: [
      // {
      //   type: 'text',
      //   name: 'fullName',
      //   label: 'Name',
      // },
      // {
      //   type: 'date',
      //   name: 'dateOfBirth',
      //   label: 'Date of birth',
      // },
      // {
      //   type: 'text',
      //   name: 'location',
      //   label: 'Location',
      // },
      // {
      //   type: 'text',
      //   name: 'phone',
      //   label: 'Phone',
      // },
      // {
      //   type: 'text',
      //   name: 'email',
      //   label: 'Email',
      // },
      // {
      //   type: 'text',
      //   name: 'currentJob',
      //   label: 'Current Job',
      // },
      // {
      //   type: 'text',
      //   name: 'experience',
      //   label: 'Experience',
      // },
      // {
      //   type: 'text',
      //   name: 'note',
      //   label: 'Note',
      // },
      // {
      //   type: 'text',
      //   name: 'idCard',
      //   label: 'ID Card',
      // },
      // {
      //   type: 'time from to',
      //   name: 'workTime',
      //   label: 'Work Time',
      // },
    ],
  },
];

const FAKETIMEOUT = 500;

export const api = {
  list: JSON.parse(localStorage.getItem(LOCALSTORAGE.LIST)) || initialList,
  infoField:
    JSON.parse(localStorage.getItem(LOCALSTORAGE.INFOFIELD)) ||
    inititalInfoField,
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.list);
      }, FAKETIMEOUT);
    });
  },
  getByID(id) {
    const itemByID = this.list.find((item) => item.id === id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(itemByID);
      }, FAKETIMEOUT);
    });
  },
  editByID(id, data) {
    const index = this.list.findIndex((item) => item.id === id);
    const newData = {
      ...this.list[index],
      ...data,
    };
    this.list[index] = {
      ...newData,
    };

    localStorage.setItem(LOCALSTORAGE.LIST, JSON.stringify(this.list));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.list[index]);
      }, FAKETIMEOUT);
    });
  },
  deleteKeyById(id, key) {
    const index = this.list.findIndex((item) => item.id === id);
    const newData = {
      ...this.list[index],
    };
    delete newData[key];
    this.list[index] = {
      ...newData,
    };

    localStorage.setItem(LOCALSTORAGE.LIST, JSON.stringify(this.list));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.list[index]);
      }, FAKETIMEOUT);
    });
  },
  getInfoFields(id) {
    const item = this.infoField.find((item) => item.id === id);
    console.log(item);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item.fields);
      }, FAKETIMEOUT);
    });
  },
  addNewField(id, data) {
    const index = this.infoField.findIndex((item) => item.id === id);
    const newData = [...this.infoField[index].fields];
    newData.push(data);
    this.infoField[index].fields = [...newData];

    localStorage.setItem(
      LOCALSTORAGE.INFOFIELD,
      JSON.stringify(this.infoField)
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.infoField[index].fields);
      }, FAKETIMEOUT);
    });
  },
  addNewFieldAfter(id, data, idx) {
    const index = this.infoField.findIndex((item) => item.id === id);
    const newData = [...this.infoField[index].fields];
    newData.splice(idx + 1, 0, data);
    this.infoField[index].fields = [...newData];

    localStorage.setItem(
      LOCALSTORAGE.INFOFIELD,
      JSON.stringify(this.infoField)
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.infoField[index].fields);
      }, FAKETIMEOUT);
    });
  },
  deleteField(id, name) {
    const index = this.infoField.findIndex((item) => item.id === id);
    const newData = this.infoField[index].fields.filter(
      (field) => field.name !== name
    );
    this.infoField[index].fields = [...newData];

    localStorage.setItem(
      LOCALSTORAGE.INFOFIELD,
      JSON.stringify(this.infoField)
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.infoField[index].fields);
      }, FAKETIMEOUT);
    });
  },
};
