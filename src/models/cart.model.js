'user strict'

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';

const cartSchema = new Schema({
    // type: Schema.Types.ObjectId,
    cart_state: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cart_products: {
        type: Array,
        required: true,
        default: []
    },
    /**
     * [
     *  {
     *      product_id,
     *      shopId,
     *      quantity,
     *      price,
     *      name,
     *      image
     *   }
     * ]
     */

    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: Number, required: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    }
});

// module.exports = model('Cart', cartSchema);
module.exports = {
    cart: model(DOCUMENT_NAME, cartSchema)
}

