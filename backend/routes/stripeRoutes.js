import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a Stripe Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { orderId, userId, amount, currency } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: `Order #${orderId}`,
              description: `Payment for order ${orderId} by user ${userId}`,
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/users/${userId}/order/${orderId}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/users/${userId}/order/${orderId}/payment`,
      metadata: {
        orderId,
        userId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook to handle Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'your_webhook_secret'; // Replace with your Stripe webhook secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { orderId, userId } = session.metadata;

    try {
      // Update order status in the database (example, adjust based on your DB schema)
      // Assuming you have a function to update the order status
      // await updateOrderStatus(orderId, userId, 'paid');
      console.log(`Payment successful for order ${orderId} by user ${userId}`);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }

  res.json({ received: true });
});

export default router;