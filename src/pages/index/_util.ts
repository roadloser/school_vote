/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2020-12-31 15:35:27
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-03 17:52:10
 */
import lang, { langPage } from "@/lang/lang";

export const getLang = (page: langPage = 'index') => lang.getLang(page)