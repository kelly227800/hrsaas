import request from "@/utils/request";
/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
export function getDepts() {
  return request({
    url: "/company/department",
  });
}

/**
 * 删除部门
 * @param {Object} data
 * @returns promise
 */
export function delDepts(id) {
  return request({
    url: "/company/department/" + id,
    method: "DELETE",
  });
}

/**
 * 添加部门
 * @param {Object} data
 * @returns promise
 */
export function addDepts(data) {
  return request({
    url: "/company/department",
    method: "POST",
    data,
  });
}

/**
 * 通过id获取部门
 * @param {Object} data
 * @returns promise
 */
export function getDeptsById(id) {
  return request({
    url: "/company/department/" + id,
  });
}
/**
 * 通过id编辑部门
 * @param {Object} data
 * @returns promise
 */
export function editDeptsById(data) {
  return request({
    url: "/company/department/" + data.id,
    method: "PUT",
    data,
  });
}
