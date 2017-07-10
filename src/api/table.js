import fetch from '@/utils/fetch';

export default function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params
  });
}

