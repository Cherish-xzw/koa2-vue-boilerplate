import yFetch from '@/utils/yFetch';

export function getList(params) {
  return yFetch({
    url: '/table/list',
    method: 'get',
    params
  });
}


