import axios from 'axios'

let request=axios.create({
    baseURL:'http://192.168.1.8:3000',
    timeout:12000
})

//请求商家信息
export function getSeller(){
    return request.get('/api/seller')
}
//请求评论信息
export function getRatings(){
    return request.get('/api/ratings')
}
//请求商品列表
export function getGoods(){
    return request.get('/api/goods')
}