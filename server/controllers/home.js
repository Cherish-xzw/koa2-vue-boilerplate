const getLiveList = async function(ctx) {
  ctx.body = {
    id: 1,
    title: '优酷直播',
    url: 'http://youku.com'
  };
};

export default {
  getLiveList
};
