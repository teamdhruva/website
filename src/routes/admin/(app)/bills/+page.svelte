<script lang="ts">
  import { generateUpiLink } from "$lib/admin/payment";
  import type { Bill, User } from "$lib/admin/types";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import QR from "@svelte-put/qr/svg/QR.svelte";
  import { formatDateTime } from "$lib/admin/date";

  export let data: { user: User; bills: Bill[] };

  let showPaid = "both"; // Change to 'both', 'paid', or 'unpaid'
  let sortBy = "createdAt"; // Change to 'createdAt' or 'amount'
  let sortOrder = "asc"; // Change to 'asc' or 'desc'

  $: billsToShow = data.bills
    .filter(
      (bill) =>
        showPaid === "both" ||
        (showPaid === "paid" && bill.paid_at) ||
        (showPaid === "unpaid" && !bill.paid_at),
    )
    .sort((a, b) => {
      const aValue = sortBy === "createdAt" ? new Date(a.created_at) : a.amount;
      const bValue = sortBy === "createdAt" ? new Date(b.created_at) : b.amount;

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
          ? 1
          : -1;
    });

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
    let body = JSON.stringify({ id: bill.id });
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
    let body = JSON.stringify({ id: bill.id });
    fetch(`/api/admin/bills/unpay`, { method: "DELETE", body })
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
    on:click={() =>
      (showPaid =
        showPaid === "paid"
          ? "unpaid"
          : showPaid === "unpaid"
            ? "both"
            : "paid")}
  >
    {showPaid === "paid"
      ? "Show Unpaid Bills"
      : showPaid === "unpaid"
        ? "Show Both Bills"
        : "Show Paid Bills"}
  </button>
  <button
    class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
    on:click={() => {
      sortBy = "createdAt";
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    }}
  >
    Sort by Created At ({sortOrder === "asc" ? "Descending" : "Ascending"})
  </button>
  <button
    class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
    on:click={() => {
      sortBy = "amount";
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    }}
  >
    Sort by Amount ({sortOrder === "asc" ? "Descending" : "Ascending"})
  </button>
</span>

<div class="flex-1 flex flex-col items-center justify-center gap-4 p-4">
  <span class="text-center">
    Showing {billsToShow.length} {showPaid === "both" ? "" : showPaid} bill{billsToShow.length === 1 ? "" : "s"}
  </span>

  {#if billsToShow.length === 0}
    <h2 class="text-2xl text-center text-white">No bills to show! Yay!</h2>
  {/if}
  {#each billsToShow as bill}
    <div
      class="flex flex-col justify-between w-full max-w-screen-md bg-neutral-800 shadow-md rounded-md p-4 border"
      class:border-green-500={bill.paid_at}
    >
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">
          {bill.name ?? bill.created_by}
          <span class="font-normal text-neutral-500">{bill.pay_to}</span>
        </h2>
        <p class="text-lg">₹{bill.amount}, {bill.description}</p>
        <p class="text-lg text-neutral-500">
          {formatDateTime(bill.created_at)}
          {#if bill.paid_at}
            <span class="text-green-400 opacity-50">(Paid at {formatDateTime(bill.paid_at)})</span>
          {/if}
        </p>
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
            class="text-green-400 hover:text-green-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
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
        <QR data={generateLink(qrCodeBill)} />
        <h2 class="text-lg mb-4">{qrCodeBill.pay_to}</h2>
      </div>
    </div>
  </div>
{/if}
