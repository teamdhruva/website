<script lang="ts">
  import { browser } from "$app/environment";
  import { fade, fly } from "svelte/transition";
  import { formatDateTime } from "../date";
  import type { Bill } from "../types";
  import { quintOut } from "svelte/easing";
  import QR from "@svelte-put/qr/svg/QR.svelte";
  import { generateUpiLink } from "../payment";
  import ThreeDots from "$lib/icons/ThreeDots.svelte";

  export let bill: Bill;
  export let markAsPaid: () => void = () => {};
  export let markAsUnpaid: () => void = () => {};
  export let deleteBill: (() => void) | null = null;
  export let allowEdit: boolean = false;
  export let menuKey: number;

  let viewBill = false;
  let showQrCode = false;
  let confirmDelete = false;

  $: actuallyShowMenu = menuKey === bill.id;

  if (browser) {
    function handleOutsideClick(event: MouseEvent) {
      if (
        !viewBill &&
        !showQrCode &&
        actuallyShowMenu &&
        !event.target!.closest(".menu-container")
      ) {
        menuKey = -1;
      }
    }

    document.addEventListener("click", handleOutsideClick);
  }

  function generateLink(bill: Bill) {
    return generateUpiLink(
      bill.name ?? bill.created_by,
      bill.pay_to,
      bill.amount,
      bill.description,
    );
  }
</script>

<div
  class="flex flex-col justify-between w-full max-w-screen-md bg-neutral-800 shadow-md rounded-md p-4 border"
  class:border-green-500={bill.paid_at}
  class:border-red-500={confirmDelete}
>
  <div class="flex flex-col gap-2">
    <h2 class="flex flex-wrap flex-row gap-4 items-center text-xl font-bold">
      {bill.name ?? bill.created_by}
      <span class="font-normal text-neutral-500">{bill.pay_to}</span>
      <span class="flex-1"></span>

      <div class="menu-container relative font-normal text-base z-10">
        {#if actuallyShowMenu}
          <div
            class="dropdown-menu flex flex-col gap-4 absolute -top-16 right-10 w-48 bg-neutral-900 drop-shadow-xl rounded-md p-2"
          >
            <button
              class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
              on:click={() => (showQrCode = true)}
            >
              Show QR code
            </button>
            {#if allowEdit}
              {#if bill.paid_at}
                <button
                  class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
                  on:click={markAsUnpaid}
                >
                  Mark as Unpaid
                </button>
              {:else}
                <button
                  class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
                  on:click={markAsPaid}
                >
                  Mark as Paid
                </button>
              {/if}
            {/if}
            <button
              class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
              on:click={() => (viewBill = true)}
            >
              View Bill
            </button>
            <a href={`/api/admin/blob/${bill.image_slug}`} download={`${bill.image_slug}`} class="w-full">
              <button
                class="text-blue-400 hover:text-blue-500 transition bg-neutral-700 bg-opacity-50 w-full rounded-md p-2"
              >
                Download Bill
              </button>
            </a>
            {#if deleteBill}
              <button
                class="text-red-400 hover:text-red-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
                on:click={() => (confirmDelete = true)}
              >
                Delete Bill
              </button>
            {/if}
          </div>
        {/if}
        <button
          class="text-blue-400 hover:text-blue-500 transition hover:bg-neutral-700 bg-opacity-50 rounded-md p-2"
          on:click|stopPropagation={(e) => {
            menuKey = actuallyShowMenu ? -1 : bill.id;
          }}
        >
          <ThreeDots />
        </button>
      </div>
    </h2>
    <p class="text-lg">₹{bill.amount}, {bill.description}</p>
    <p class="text-lg text-neutral-500">
      {formatDateTime(bill.created_at)}
      {#if bill.paid_at}
        <span class="text-green-400 opacity-50"
          >(Paid at {formatDateTime(bill.paid_at)})</span
        >
      {/if}
    </p>
  </div>
</div>

{#if viewBill}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (viewBill = false)}
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
      class="relative bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <h2 class="text-xl mb-4 font-semibold">{bill.description}</h2>
      <div class="flex flex-col gap-4">
        <img
          class="flex flex-1 text-center items-center justify-center rounded-lg object-contain max-w-md"
          src={`/api/admin/blob/${bill.image_slug}`}
          alt={bill.description}
          loading="lazy"
        />
      </div>
    </div>
  </div>
{/if}

{#if showQrCode}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (showQrCode = false)}
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
      class="relative bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <div class="flex flex-col gap-4 items-center justify-center">
        <QR data={generateLink(bill)} />
        <h2 class="text-2xl">Pay ₹{bill.amount} to {bill.pay_to}</h2>
      </div>
    </div>
  </div>
{/if}

{#if confirmDelete}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (confirmDelete = false)}
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
      class="relative flex flex-col items-center justify-center gap-2bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <h2 class="text-xl font-semibold">
        Are you sure you want to delete this bill?
      </h2>
      <h3 class="text-lg">This action cannot be undone.</h3>
      <p class="text-neutral-500 mb-2">
        {bill.name}, ₹{bill.amount}, {bill.description}
      </p>
      <button
        class="text-red-400 hover:text-red-500 transition bg-neutral-700 bg-opacity-50 rounded-md p-2"
        on:click={() => {
          confirmDelete = false;
          deleteBill();
        }}
      >
        Delete Bill
      </button>
    </div>
  </div>
{/if}
