import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ price, coins }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { userData, refetch } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch the clientSecret when the component loads
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          amount: price * 100, // Convert to cents
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        toast.error("Error fetching client secret:");
        console.log("Error fetching client secret", err);

        setError("Failed to initialize payment. Please try again.");
      }
    };

    if (price > 0) fetchClientSecret();
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!stripe || !elements) {
      setError("Stripe is not properly initialized. Please refresh the page.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card details are not entered.");
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      setError("Client secret is not available. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      // Confirm the Payment Intent
      const { error: intentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: userData.name,
              email: userData.email,
            },
          },
        });

      if (intentError) {
        console.error("Payment Intent Error:", intentError);
        setError(intentError.message);
        setLoading(false);
        return;
      }

      console.log("Payment Intent Confirmed:", paymentIntent);

      const paymentData = {
        coins: Number(coins),
        price: Number(price),
        email: userData.email,
        name: userData.name,
        date: new Date(),
        role: "Buyer",
        paymentId: paymentIntent.id,
      };

      // Save Payment Info to the Database
      const res = await axiosSecure.post("/payments", paymentData);
      refetch();
      // console.log(res);

      if (res.data?.paymentResult?.insertedId) {
        toast.success("Thank you for the taka paisa");
        navigate("/dashboard");
      }

      setSuccessMessage(
        "Payment successful! Coins have been added to your account."
      );
    } catch (err) {
      console.error("Payment Process Error:", err);
      setError(
        "An error occurred during the payment process. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-lg text-base shadow-sm focus:ring focus:ring-primary focus:outline-none" />
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {successMessage && (
        <p className="text-green-500 font-medium">{successMessage}</p>
      )}
      <button
        className={`btn bg-primary hover:bg-[#0d775dd7] text-white text-lg w-full ${
          loading ? "btn-disabled" : ""
        }`}
        type="submit"
        disabled={loading || !clientSecret}
      >
        {loading ? "Processing..." : `Bay Now $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
