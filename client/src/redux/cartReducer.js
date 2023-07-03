import { createSlice } from '@reduxjs/toolkit';
import {toast} from "react-toastify"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {

        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalPrice = action.payload.totalPrice;
        },
        addItemToCart(state, action) {
            const newItem = action.payload
           
            const existingItem = state.items.find((item) => item._id === newItem._id);

            state.totalQuantity++;
            state.totalPrice=state.totalPrice + newItem.price
            if (!existingItem) {
                state.items.push({
                    _id: newItem._id,
                
                    price: +newItem.price,
                    quantity: 1,
                    name: newItem.name,
                    desc: newItem.desc,
                    totalPrice: +newItem.price,
                    img: newItem.img

                });
               
                toast.success("Product added  successfuly",{
                    position:"bottom-left"
                })
            } else {

                existingItem.quantity++;
                toast.info("Increased Product Quantity",{
                    position:"bottom-left"
                })
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const newItem = action.payload;
       
            const existingItem = state.items.find((item) => item._id === newItem._id);

            state.totalQuantity--;
            state.totalPrice=state.totalPrice - newItem.price
            if (existingItem.quantity === 1) {
                console.log('exist')
                state.items = state.items.filter((item) => item._id !== newItem._id);
                console.log(state.items)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },

        emptyCard(state){
            toast.info("Clear Cart ",{
                position:"bottom-left"
            })
            state.items = []
            state.totalQuantity= 0
            state.totalPrice=0
          
        }
    },
});

export const { addItemToCart,emptyCard, removeItemFromCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;