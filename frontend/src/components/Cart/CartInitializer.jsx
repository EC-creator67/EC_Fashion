import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../redux/slices/cartSlice';

const CartInitializer = () => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    // Fetch cart when app loads
    const initializeCart = () => {
      const userId = user?._id || null;
      const currentGuestId = guestId;

      console.log('Initializing cart with:', {
        userId,
        guestId: currentGuestId,
      });

      // Only fetch if we don't already have a cart or if user/guest changed
      if (!cart || cart.products?.length === 0) {
        dispatch(fetchCart({ userId, guestId: currentGuestId }));
      }
    };

    initializeCart();
  }, [dispatch, user, guestId, cart]);

  // This component doesn't render anything
  return null;
};

export default CartInitializer;
