import React from 'react'
import Shipping from '../../assets/free-shipping.png'
import Return from '../../assets/return.png'
import Cart from '../../assets/cart.png'

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>

            {/* Feature 1 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <img src={Shipping} alt='shipping' className='text-xl'/>
                </div>
                <h4 className='tracking-tighter text-gray-500 mb-2'>FREE INTERNATIONAL SHIPPING</h4>
                <p className='tracking- text-gray-400 mb-2'>Spedizioni Internazionali Gratuite</p>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    On all orders over $100,00 <br />
                    Su ordini dai $ 100,00 in su
                </p>
            </div>
            {/* Feature 2 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <img src={Return} alt='return'  className='text-xl'/>
                </div>
                <h4 className='tracking-tighter text-gray-500 mb-2'>45 DAYS RETURN</h4>
                <p className='tracking- text-gray-400 mb-2'>45 Giorni per il rimborso </p>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    Money back Guarantee <br />
                    Soldi indietro Garantiti
                </p>
            </div>

            {/* Feature 3 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <img src={Cart} alt='cart' width={30}/>
                </div>
                <h4 className='tracking-tighter text-gray-500 mb-2'>SECURE CHECKOUT</h4>
                <p className='tracking- text-gray-400 mb-2'>Pagamento Sicuro</p>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    100% secured checkout process <br />
                    100% processo di pagamento sicuro
                </p>
            </div>

        </div>
    </section>
  )
}

export default FeaturesSection