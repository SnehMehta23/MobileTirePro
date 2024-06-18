<script setup lang="js">
const appId = 'sandbox-sq0idb-2IrtLpJE_wYWee2XqXJx1A';
const locationId = 'L5TYMTK1GRZGC';

let card;
let paymentStatus = ref("");
let loading = ref(true);
let googlePay = ref("")

onMounted(async () => {
  loading.value = true;
  await initializePaymentForm();
  await initializeGooglePay()
  loading.value = false;

});


function buildPaymentRequest(payments) {
  return payments.paymentRequest({
    countryCode: 'US',
    currencyCode: 'USD',
    total: {
      amount: '1.00',
      label: 'Total',
    },
  });
}

const initializeGooglePay = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(appId, locationId);
  try {
    const paymentRequest = buildPaymentRequest(payments)
    const googlePay = await payments.googlePay(paymentRequest);
    await googlePay.attach('#google-pay-button', {
      buttonSizeMode: 'fill',
      buttonType: 'long'
    });
    const googlePayButton = document.getElementById('google-pay-button');
    googlePayButton.onclick = async () => {
      await handleGooglePaySubmission(googlePay)
    }
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
}


const initializePaymentForm = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(appId, locationId);
  try {
    card = await payments.card();
    await card.attach("#card-container");
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
};

const tokenize = async (paymentMethod) => {
  // console.log(paymentMethod)
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
};

const handlePaymentMethodSubmission = async () => {
  paymentStatus.value = "";
  const token = await tokenize(card);
  const {data, error} = await useFetch("/api/pay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      locationId,
      sourceId: token,
    },
  });
  if (!error.value) {
    paymentStatus.value = "Payment completed";
  } else {
    paymentStatus.value = "Payment failed";
  }
};

const handleGooglePaySubmission = async (googlePlay) => {
  paymentStatus.value = "";
  const token = await tokenize(googlePlay);
  const {data, error} = await useFetch("/api/pay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      locationId,
      sourceId: token,
    },
  });
  if (!error.value) {
    paymentStatus.value = "Payment completed";
  } else {
    paymentStatus.value = "Payment failed";
  }
};

</script>

<template>
  <div class="w-full flex justify-center items-center h-screen">
    <div class="w-1/4">
      <form class="space-y-2.5" @submit.prevent="handlePaymentMethodSubmission">
        <div v-if="loading">Loading...</div>
        <div id="card-container"/>
        <button>Pay $1.00</button>
        <div class="w-full" id="google-pay-button"></div>
      </form>
      <div v-if="paymentStatus" id="payment-status-container">
        {{ paymentStatus }}
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 6px;
  cursor: pointer;
  border-style: none;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 16px;
  width: 100%;
}

button:hover {
  background-color: #005fe5;
}

button:active {
  background-color: #0055cc;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

#payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
</style>