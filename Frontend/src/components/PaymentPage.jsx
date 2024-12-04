import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from "react-loading";

const PaymentPage = () => {
  const { userId, orderId } = useParams(); // Get userId and orderId from URL params
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(""); // Track payment method input
  const [paymentAmount, setPaymentAmount] = useState(0); // Track payment amount
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details to get the total amount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/order/${orderId}`,
          { withCredentials: true }
        );
        const { total_amount } = response.data.Orders;
        setPaymentAmount(total_amount); // Set payment amount to the order's total amount
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, orderId]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod.trim()) {
      alert("Please select a payment method.");
      return;
    }

    try {
      setLoading(true);

      // Prepare payment data based on the selected method
      const paymentData = {
        paymentMethod,
        paymentAmount,
      };

      if (paymentMethod === "Debit Card") {
        paymentData.cardDetails = cardDetails;
      } else if (paymentMethod === "Bank Transfer") {
        paymentData.bankDetails = bankDetails;
      }

      const response = await axios.post(
        `http://localhost:5000/api/users/${userId}/order/${orderId}/payments`,
        paymentData,
        { withCredentials: true }
      );
      navigate(`/users/${userId}/order/${orderId}/confirmation`); // Redirect to confirmation page
    } catch (err) {
      console.error("Failed to process payment:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render Loading Indicator
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#4A5568" height={50} width={50} />
      </div>
    );

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="w-[80%] py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Timeline Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-[49%] h-[3px] bg-custom-brown-light"></div>
          <div>
            <FontAwesomeIcon icon={faTruck} className="text-custom-brown text-3xl" />
          </div>
          <div className="w-[49%] h-[3px] bg-custom-brown-light"></div>
        </div>

        <h1 className="text-3xl text-center font-bold mb-8">Payment</h1>
        <form
          className="space-y-4 p-4 border rounded-md shadow-sm"
          onSubmit={handlePayment}
        >
          <label
            className="block text-lg font-semibold"
            htmlFor="paymentMethod"
          >
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-custom-brown"
          >
            <option value="">Select a payment method</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          {/* Debit Card Fields */}
          {paymentMethod === "Debit Card" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
            </div>
          )}

          {/* Bank Transfer Fields */}
          {paymentMethod === "Bank Transfer" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Account Number"
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, bankName: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
            </div>
          )}

          {/* Display the payment amount */}
          <p className="text-lg mt-4">
            Payment Amount: <span className="font-bold">${paymentAmount}</span>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-custom-brown text-white rounded-md hover:border-2 hover:border-custom-brown hover:text-custom-brown hover:bg-transparent"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;
