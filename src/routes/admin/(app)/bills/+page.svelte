<script lang="ts">
  import { generateUpiLink } from "$lib/admin/payment";
  import type { Bill, User } from "$lib/admin/types";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import QrCode from "svelte-qrcode";

  export let data: { user: User; bills: Bill[] };

  let showPaid = false;

  $: billsToShow = showPaid
    ? data.bills
    : data.bills
        .filter((bill) => !bill.paid_at)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));

  function generateLink(bill: Bill) {
    return generateUpiLink(
      bill.name ?? bill.created_by,
      bill.pay_to,
      bill.amount,
      bill.description,
    );
  }

  function markAsPaid(bill: Bill) {
    disableAll = true;
    let body = JSON.stringify({ bill_id: bill.id });
    fetch(`/api/admin/bills/pay`, { method: "POST", body })
      .then((res) => {
        if (res.ok) {
          data.bills = data.bills.map((b) =>
            b.id === bill.id ? { ...b, paid_at: new Date().toISOString() } : b,
          );
        } else {
          console.error("Failed to mark bill as paid");
        }
      })
      .finally(() => {
        disableAll = false;
      });
  }

  function markAsUnpaid(bill: Bill) {
    disableAll = true;
    let body = JSON.stringify({ bill_id: bill.id });
    fetch(`/api/admin/bills/unpay`, { method: "POST", body })
      .then((res) => {
        if (res.ok) {
          data.bills = data.bills.map((b) =>
            b.id === bill.id ? { ...b, paid_at: undefined } : b,
          );
        } else {
          console.error("Failed to mark bill as unpaid");
        }
      })
      .finally(() => {
        disableAll = false;
      });
  }

  let qrCodeBill: Bill | null = null;
  let showBillBill: Bill | null = null;
  let disableAll = false;
</script>

<h1 class="text-4xl font-bold text-center p-2">Bills</h1>

<span class="flex flex-row w-full justify-center items-center gap-4">
  <button
    class="text-red-400 hover:text-red-500 transition bg-neutral-700 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
    on:click={() => (showPaid = !showPaid)}
  >
    {showPaid ? "Hide" : "Show"} Paid Bills
  </button>
</span>

<div class="flex-1 flex flex-col items-center justify-center gap-4 p-4">
  {#if billsToShow.length === 0}
    <h2 class="text-2xl text-center text-white">No bills to show! Yay!</h2>
  {/if}
  {#each billsToShow as bill}
    <div
      class="flex sm:flex-row max-sm:flex-col sm:flex-wrap justify-between w-full max-w-screen-md bg-neutral-800 shadow-md rounded-md p-4 border"
      class:border-green-500={bill.paid_at}
    >
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">{bill.name ?? bill.created_by}</h2>
        <p class="text-lg">{bill.description}</p>
        <p class="text-lg">Amount: ₹{bill.amount}</p>
        <p class="text-lg">Pay to: {bill.pay_to}</p>
        <p class="text-lg">
          Created at: {new Date(bill.created_at).toLocaleString()}
        </p>
        {#if bill.paid_at}
          <p class="text-lg">
            Paid at: {new Date(bill.paid_at).toLocaleString()}
          </p>
        {/if}
      </div>
      <div class="flex flex-row gap-2">
        <button
          class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
          on:click={() => (showBillBill = bill)}
          disabled={disableAll}
        >
          View Bill
        </button>
        {#if bill.paid_at}
          <button
            class="text-red-400 hover:text-red-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
            disabled={disableAll}
            on:click={() => markAsUnpaid(bill)}
          >
            Mark as Unpaid
          </button>
        {:else}
          <button
            class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
            on:click={() => (qrCodeBill = bill)}
            disabled={disableAll}
          >
            Show QR code
          </button>

          <button
            class="text-green-400 hover:text-green-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
            disabled={disableAll}
            on:click={() => markAsPaid(bill)}
          >
            Mark as Paid
          </button>
        {/if}
      </div>
    </div>
  {/each}
</div>

{#if showBillBill}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (showBillBill = null)}
      class="cursor-default absolute inset-0 bg-black opacity-50"
    ></button>
    <div
      transition:fly={{
        delay: 0,
        duration: 200,
        x: 0,
        y: 500,
        easing: quintOut,
      }}
      class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <h2 class="text-xl mb-4 font-semibold">{showBillBill.description}</h2>
      <div class="flex flex-col gap-4">
        <img
          class="flex flex-1 text-center items-center justify-center rounded-lg object-contain"
          src={`/api/admin/blob?id=${showBillBill.id}`}
          alt={showBillBill.description}
          loading="lazy"
        />
      </div>
    </div>
  </div>
{/if}

{#if qrCodeBill}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (qrCodeBill = null)}
      class="cursor-default absolute inset-0 bg-black opacity-50"
    ></button>
    <div
      transition:fly={{
        delay: 0,
        duration: 200,
        x: 0,
        y: 500,
        easing: quintOut,
      }}
      class="relative bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <div class="flex flex-col gap-4 items-center justify-center">
        <QrCode value={generateLink(qrCodeBill)} />
        <h2 class="text-lg mb-4">{qrCodeBill.pay_to}</h2>
      </div>
    </div>
  </div>
{/if}
