import { useSearchParams } from 'react-router-dom';
import CheckoutFail from '../components/CheckoutFail';
import CheckoutSuccess from '../components/CheckoutSuccess';

const Checkout = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');

  return <>{success === 'true' ? <CheckoutSuccess /> : <CheckoutFail />}</>;
};

export default Checkout;
