<script lang="ts">
  import BillCard from "$lib/admin/components/BillCard.svelte";
  import type { Bill, User } from "$lib/admin/types";
  import imageCompression from "browser-image-compression";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  export let data: { user: User; bills: Bill[]; newBill: boolean };

  let showNewBill = data.newBill;
  let showPaid = false;

  var allBills = data.bills ?? [];

  $: billsToShow = showPaid
    ? allBills
    : (allBills ?? [])
        .filter((bill) => !bill.paid_at)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));

  let showBillBill: Bill | null = null;

  let formBillDescription = "";
  let formBillAmount: number | null = null;
  let formBillPayTo = "";
  let formBillImage: File[] = [];
  let formBillFileList: FileList | null = null;
  let menuKey = -1;

  let disableAll = false;

  async function uploadBill(e: SubmitEvent) {
    if (
      !formBillDescription ||
      !formBillAmount ||
      !formBillPayTo ||
      !formBillFileList ||
      !formBillFileList.item(0)
    ) {
      return;
    }

    disableAll = true;

    let compressedFile: File;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      compressedFile = await imageCompression(
        formBillFileList!.item(0)!,
        options,
      );
      console.log(
        `Compressized size is ${compressedFile.size / 1024 / 1024} MB`,
      );
    } catch (error) {
      console.log("Failed to compress image");
      console.log(error);
      return;
    }

    try {
      // Upload the image
      let blobData = new FormData();
      blobData.append("file", compressedFile);
      let id = Math.random().toString(36).substring(2);
      id += compressedFile.name.match(/\.[0-9a-z]+$/i)?.[0] ?? "";

      const blobResponse = await fetch(`/api/admin/blob/${id}`, {
        method: "POST",
        body: blobData,
      });

      console.log(await blobResponse.text());

      if (!blobResponse.ok) {
        throw new Error("Failed to upload bill image");
      }

      console.log("Uploaded image");

      // Upload the bill
      let body = JSON.stringify({
        description: formBillDescription,
        amount: formBillAmount,
        pay_to: formBillPayTo,
        image_slug: id,
      });

      console.log("Uploading bill");

      const billResponse = await fetch("/api/admin/bills", {
        method: "POST",
        body,
      });

      console.log("Request sent");

      if (!billResponse.ok) {
        console.log(billResponse.status);
        throw new Error("Failed to upload bill");
      }

      console.log("Uploaded bill");

      showNewBill = false;
      formBillDescription = "";
      formBillAmount = 0;
      formBillPayTo = "";
      formBillImage = [];

      console.log("Reset form");

      // Fetch the bills again
      const billsResponse = await fetch("/api/admin/bills");

      if (!billsResponse.ok) {
        throw new Error("Failed to fetch bills");
      }

      console.log("Fetched bills");
      let json = await billsResponse.json();

      allBills = json.bills;
      console.log(allBills);
    } catch (err) {
      console.error(err);
    } finally {
      disableAll = false;
    }
  }

  function deleteBill(bill: Bill) {
    disableAll = true;
    let body = JSON.stringify({ id: bill.id });
    fetch(`/api/admin/bills`, { method: "DELETE", body })
      .then((res) => {
        if (res.ok) {
          allBills = allBills.filter((b) => b.id !== bill.id);
        } else {
          console.error("Failed to delete bill");
        }
      })
      .finally(() => {
        disableAll = false;
        menuKey = -1;
      });
  }
</script>

<svelte:head>
  <title>My Bills</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center p-2">My Bills</h1>

<span class="flex flex-row justify-center m-4 items-center gap-4">
  <button
    class="text-red-400 hover:text-red-500 transition bg-neutral-700 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
    on:click={() => (showPaid = !showPaid)}
  >
    {showPaid ? "Hide" : "Show"} Paid Bills
  </button>

  <button
    class="text-green-400 hover:text-green-500 transition bg-neutral-700 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
    on:click={() => (showNewBill = true)}
  >
    Submit Bill
  </button>
</span>

<div class="flex-1 flex flex-col items-center justify-center gap-4 p-4">
  {#if billsToShow.length === 0}
    <h2 class="text-2xl text-center text-white">No bills</h2>
  {/if}
  {#each billsToShow as bill}
    <BillCard {bill} bind:menuKey deleteBill={() => deleteBill(bill)} />
  {/each}
</div>

{#if showNewBill}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => (showNewBill = false)}
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
      <h2 class="text-xl mb-4 font-semibold">New bill</h2>
      <form class="flex flex-col gap-4" on:submit|preventDefault={uploadBill}>
        <input
          type="text"
          bind:value={formBillDescription}
          placeholder="Description"
          class="p-2 rounded-md bg-neutral-900"
        />
        <input
          type="number"
          bind:value={formBillAmount}
          placeholder="Amount"
          class="p-2 rounded-md bg-neutral-900"
        />
        <input
          type="text"
          bind:value={formBillPayTo}
          placeholder="UPI ID"
          class="p-2 rounded-md bg-neutral-900"
        />

        <span class="flex-col">
          <p>Upload Bill Image</p>
          <input
            type="file"
            bind:files={formBillFileList}
            bind:value={formBillImage}
            class="p-2 rounded-md bg-neutral-900 text-white"
            accept="image/png, image/jpeg, image/webp"
          />
        </span>

        <button
          type="submit"
          class="text-green-400 hover:text-green-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
          disabled={disableAll}
        >
          Submit Bill
        </button>
      </form>
    </div>
  </div>
{/if}

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
      class="relative bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <h2 class="text-xl mb-4 font-semibold">{showBillBill.description}</h2>
      <div class="flex flex-col gap-4">
        <img
          class="flex flex-1 text-center items-center justify-center rounded-lg object-contain"
          src={`/api/admin/blob/${showBillBill.image_slug}`}
          alt={showBillBill.description}
          loading="lazy"
        />
      </div>
    </div>
  </div>
{/if}
