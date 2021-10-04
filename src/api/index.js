import { LOCALSTORAGE } from '../constants';

const initialList = [
  {
    id: 1,
    key: 1,
    jobTitle: 'Code',
    time: '17:00:00',
    fullName: 'Nguyễn Hồng Hữu',
    dayOfBirth: '22-08-2000',
    location: 'Hồ Chí Minh',
    phone: '0379339693',
    email: 'nguyenhuu220800@gmail.com',
    currentJob: 'Intern',
    experience: 'None',
    note: 'None',
    idCard: '212589849',
    startTime: '17:00:00',
    finishTime: '18:00:00',
  },
  {
    id: 2,
    key: 2,
    jobTitle: 'Eat',
    time: '18:20:00',
    fullName: 'Đặng Tường Vy',
    dayOfBirth: '08-04-2001',
    location: 'Hồ Chí Minh',
    phone: '0702359976',
    email: 'dangtuongvy080401@gmail.com',
    currentJob: 'Student',
    experience: 'None',
    note: 'None',
    idCard: '212589849',
    startTime: '18:00:00',
    finishTime: '19:00:00',
  },
  {
    id: 3,
    key: 3,
    jobTitle: 'Sleep',
    time: '20:21:00',
    fullName: 'Gold',
    dayOfBirth: '19-07-2014',
    location: 'Quảng Ngãi',
    phone: '113',
    email: 'gold1907@gmail.com',
    currentJob: 'Student',
    experience: 'None',
    note: 'None',
    idCard: '212589849',
    startTime: '07:00:00',
    finishTime: '10:00:00',
  },
];

const FAKETIMEOUT = 500;

export const api = {
  list: JSON.parse(localStorage.getItem(LOCALSTORAGE.LIST)) || initialList,
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
};
