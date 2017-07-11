import yFetch from '@/utils/yFetch';

const getList = () => {
  return yFetch('/table/list', 'GET');
};

export default getList;
