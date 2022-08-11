import request from "@/utils/request";

/**
 * 获取所有角色列表
 * @param {*} params 
 * @returns 
 */
export function getRoLeListApi(params) {
  return request({
    url: "/sys/role",
    params,
  });
}
/**
 * 添加角色
 * @param {*} data {name, region}
 */
export function addRoLeAPi(data) {
  return request({
    url: "/sys/role",
    method: "POST",
    data,
  });
}
