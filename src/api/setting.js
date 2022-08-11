import request from "@/utils/request";

/**
 * 根据id查询企业
 * @param {*} id 企业ID
 */
export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`,
  });
}
