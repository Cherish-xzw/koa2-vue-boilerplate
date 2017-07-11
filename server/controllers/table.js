const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    date: `2017-06-${i}`,
    name: '王小虎',
    address: `武汉市金融港 ${i} 号`
  });
}

const getList = async function(ctx) {
  ctx.body = { data };
};

export default {
  getList
};
