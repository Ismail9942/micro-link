import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const { price, coins } = useParams();

  return (
    <div className="min-h-[50vh]">
      <div className="my-10 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Purchase {coins} Coins</h2>
        <p className="text-lg mb-6">
          Pay ${price} to get {coins} coins.
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={Number(price)}
            coins={Number(coins)}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
