import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmationPage = () => {
  const { userId, orderId } = useParams(); // Get userId and orderId from URL params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentId, setPaymentId] = useState(""); // Track payment ID
  const [orderDetails, setOrderDetails] = useState(null); // Track order details

  // Fetch order and payment details
  useEffect(() => {
    const fetchOrderAndPayment = async () => {
      try {
        // Fetch payment details for the order
        const paymentResponse = await axios.get(
          `http://localhost:5000/api/users/${userId}/order/${orderId}/payments`,
          { withCredentials: true }
        );

        const payments = paymentResponse.data.Payments;
        const lastPayment = payments[payments.length - 1]; // Use the last payment

        if (!lastPayment) {
          throw new Error("No payment found for this order.");
        }

        setPaymentId(lastPayment.payment_id); // Set payment ID

        // Fetch order details
        const orderResponse = await axios.get(
          `http://localhost:5000/api/users/${userId}/order/${orderId}`,
          { withCredentials: true }
        );
        setOrderDetails(orderResponse.data.Orders); // Set order details
      } catch (err) {
        console.error("Failed to fetch order or payment details:", err);
        setError("Failed to fetch order or payment details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndPayment();
  }, [userId, orderId]);

  const handleConfirm = async () => {
    if (!paymentId) {
      alert("Payment ID is missing. Cannot confirm the order.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}/order/${orderId}/payments/${paymentId}`,
        { paymentStatus: "COMPLETED" },
        { withCredentials: true }
      );
      alert(response.data.message || "Order confirmed successfully!");
      navigate("/"); // Redirect to homepage or another relevant page
    } catch (err) {
      console.error("Failed to confirm the order:", err);
      alert("Failed to confirm the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order confirmation...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="w-[80%] py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Timeline Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-[83%] h-[3px] bg-custom-brown-light"></div>
          <div className="h-5 w-5 rounded-full bg-custom-brown"></div>
          <div className="w-[15%] h-[3px] bg-custom-brown-light"></div>
        </div>
        <h1 className="text-3xl text-right font-bold mb-8">Order Confirmation</h1>
        <div className="space-y-4">
          {/* Order Details */}
          <div className="p-4 space-y-3 border rounded-md shadow-sm">
            <h2 className="text-xl font-bold">Order Details: </h2>
            <p>Order ID: {orderDetails?.o_id}</p>
            <p>Total Amount: ${orderDetails?.total_amount?.toFixed(2)}</p>
            <p>Address: {orderDetails?.address}</p>

            <button
              className="w-full p-3 bg-custom-brown text-white rounded-md hover:border-2 hover:border-custom-brown hover:text-custom-brown hover:bg-transparent"
              onClick={handleConfirm}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
