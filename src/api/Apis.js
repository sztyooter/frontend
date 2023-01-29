import axios from 'axios';

export const getMatchUps = (name = '', against = '') => {
  return axios({
    url: `https://bbte2023dataminingbackend.azurewebsites.net/api/matchups?name=${name}&against=${against}`,
    method: 'get',
  });
};

export const getMatchUp = (name = '', against = '') => {
  return axios({
    url: `https://bbte2023dataminingbackend.azurewebsites.net/api/matchup?name=${name}&against=${against}`,
    method: 'get',
  });
};

export const getChampions = () => {
  return axios({
    url: 'https://bbte2023dataminingbackend.azurewebsites.net/api/champions',
    method: 'get',
  });
};
