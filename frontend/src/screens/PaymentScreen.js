import React, {useState,useEffect} from 'react'
import second, { redirect, Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer"
import { login } from '../actions/userActions'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen({ history }) {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  let navigate = useNavigate()

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>

        <Form.Group>
            <Form.Label as='legend'>Select Mothod</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    

                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Continue
        </Button>

      </Form>

    </FormContainer>
  )
}

export default PaymentScreen
