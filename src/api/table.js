import yFetch from '@/utils/yFetch';

function getList(params) {
  return yFetch({
    url: '/table/list',
    method: 'get',
    params
  });
}

export default getList;
