import React, { Fragment } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch } from 'react-redux'
import { createOrder } from '../actions/orderAction'

const PayBtn = ({ order }) => {

    const dispatch = useDispatch()
    const tokenHandler = (token) => {
        console.log(token)
        dispatch(createOrder(order))
    }

    return (
        <Fragment>
            <StripeCheckout
                token={tokenHandler}
                stripeKey="pk_test_51NyXMoIuM3EPOKzANSC73Y3aFvaDXXniKP3XBrRDECz3tyM4t2WaKhfWuAqWsvuY6crcog6Q6TL3cKXFbd0GAxnF005dok0kxI"
            >
            </StripeCheckout>
        </Fragment>
    )
}

export default PayBtn
