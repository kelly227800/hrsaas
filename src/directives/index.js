export const imgError = {
  inserted: function (el, { value }) {
    // 聚焦元素
    // console.log(binding)
    el.onerror = function () {
      el.src = value;
    };
  },
};

export const aa = {
    inserted() {},
}