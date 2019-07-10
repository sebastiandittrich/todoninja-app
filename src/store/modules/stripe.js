import stripe from '@/assets/js/Stripe'

export default {
    namespaced: true,
    actions: {
      redirectToCheckout({ dispatch }, order) {
        return stripe.redirectToCheckout({
          // Do not rely on the redirect to the successUrl for fulfilling
          // purchases, customers may not always reach the success_url after
          // a successful payment.
          // Instead use one of the strategies described in
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: window.location.protocol + '//' + window.location.host + '/#/donate/success',
          cancelUrl: window.location.protocol + '//' + window.location.host + '/#/donate/canceled',

          ...order
        })
        .then(function (result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            dispatch('events/error', { descriptiom: result.error.message }, { root: true })
          }
        });
      }
    }
  }