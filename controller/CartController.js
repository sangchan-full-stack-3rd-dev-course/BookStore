const { ServerError } = require('../utils/errors');
const { MainController } = require('./MainController');
const {
    addCartItem,
    findCartItems,
    deleteCartItem,
} = require('../db/context/cartContext');
const dotenv = require('dotenv');
dotenv.config();

class CartController extends MainController {
    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.removeCartItem = this.removeCartItem.bind(this);
    }
    async addToCart(req,res,next){
        try{
            const { book_id, count } = req.body;

            if(!book_id || !count){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }

            let userInfo = req.userInfo;

            let results = await addCartItem(book_id, userInfo.user_id, count);
            
            if(results.affectedRows == 0){
                throw ServerError.badRequest("장바구니 담기에 실패하였습니다.");
            }

            let data = { msg : `상품 추가 성공!` };
            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
    async getCartItems(req,res,next){
        try{
            const { cart_ids } = req.body;

            if(cart_ids===undefined){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }

            let userId = req.userInfo.user_id;
            
            let [results] = await findCartItems(userId, cart_ids);

            let data = { carts : results };
            this.success(200, data).send(res);
        }
        catch(err){
            console.log(err);
            next(err);
        }
    }
    async removeCartItem(req,res,next){
        try{
            let { cart_id } = req.params;
            cart_id = parseInt(cart_id);

            let [results] = await this.deleteCartItem(cart_id);

            let data = { message : `장바구니 제거 성공!` }
            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
}


// 장바구

module.exports = {
    CartController
};