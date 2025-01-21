import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ camp }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (camp?.fees) {
      axiosSecure
        .post("/create-payment-intent", { price: camp.fees })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => {
          setError("Failed to initialize payment. Please try again later.");
        });
    }
  }, [axiosSecure, camp?.fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly. Please refresh the page.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setError("Card details are missing. Please enter valid card details.");
      return;
    }

    try {
      // Create payment method
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (cardError) {
        setError(
          "Invalid card details. Please check the card number, expiration date, and CVV."
        );
        return;
      }

      setError("");

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setError(
          "Payment failed. Please ensure your card has sufficient balance or try again later."
        );
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment data to backend
        const paymentData = {
          transactionId: paymentIntent.id,
          email: user?.email,
          name: user?.displayName,
          campId: camp._id,
          campName: camp.campName,
          amount: camp.fees,
          date: new Date(),
        };

        axiosSecure.post("/save-payment", paymentData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: `Transaction ID: ${paymentIntent.id}`,
              confirmButtonText: "Go to Registered Camps",
            }).then(() => {
              navigate("/dashboard/cart");
            });
          }
        });
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
      console.error("Payment Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${camp?.fees || 0}
      </button>
      {error && (
        <div className="alert alert-error mt-4">
          <p>{error}</p>
        </div>
      )}
      {transactionId && (
        <div className="alert alert-success mt-4">
          <p>
            Your transaction was successful! Transaction ID: {transactionId}
          </p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
