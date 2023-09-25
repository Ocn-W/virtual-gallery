import React from 'react';
import '../styles/CheckoutPage.scss';

//INTEGRATED PAYPAL SO DONT NEED FORM FOR NOW 
export default function CheckoutForm() {
  return (
    <form className='checkoutForm'>
    <section className='paymentSection'>
        <div>
        <input type='radio' id='debit' name='payment_method'/>
        <label htmlFor='debit'>Debit</label>
        </div>
        <div>
        <input type='radio' id='credit' name='payment_method'/>
        <label htmlFor='debit'>Credit</label>
        </div>
        <div>
        <input type='radio' id='paypal' name='payment_method'/>
        <label htmlFor='debit'>PayPal</label>
        </div>
    </section>
    <section className='contactSection'>
        <label htmlFor='email' style={{textDecoration:'underline'}}>Contact Information</label>
        <input type='email' id='email' name='email' placeholder='Email'/>
        <div>
        <input type='checkbox' id='newsletter_sub'/>
        <label>Keep me up to date on news and exclusive offers!</label>
        </div>
    </section>
    <section className='shippingSection'>
        <label htmlFor='shipping-info' style={{textDecoration:'underline'}}>Shipping Information</label>
        <div>
        <input type='text' id='shipping-info' name='first_name' placeholder='First Name'/>
        <input type='text' id='shipping-info' name='last_name' placeholder='Last Name'/>
        </div>
        <input type='text' id='shipping-info' name='company' placeholder='Company (optional)' style={{width:'50%'}}/>
        <input type='text' id='shipping-info' name='address' placeholder='Address' style={{width:'50%'}}/>
        <input type='text' id='shipping-info' name='address_extra' placeholder='Apartment, suite, etc. (optional)' style={{width:'50%'}}/>
        <input type='text' id='shipping-info' name='city' placeholder='City' style={{width:'50%'}}/>
        <div>
        <input type='text' id='shipping-info' name='country' placeholder='Country'/>
        <input type='number' id='shipping-info' name='postal_code' placeholder='Postal Code'/>
        </div>
        <input type='phone' id='shipping-info' name='phone' placeholder='Phone (optional)' style={{width:'50%'}}/>
    </section>
    <button onClick={() => alert('This is a mock form, thank you for using the demo!')}>Continue &#x2192;</button>
    </form>
  )
}
