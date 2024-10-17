<script lang="ts">
  import type { Bill, User } from "$lib/admin/types";
  import BillCard from "$lib/admin/components/BillCard.svelte";

  export let data: { user: User; bills: Bill[] };

  let showPaid = "both"; // Change to 'both', 'paid', or 'unpaid'
  let sortBy = "createdAt"; // Change to 'createdAt' or 'amount'
  let sortOrder = "asc"; // Change to 'asc' or 'desc'
  let menuKey = -1;

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
        menuKey = -1;
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
        menuKey = -1;
      });
  }

  function deleteBill(bill: Bill) {
    disableAll = true;
    let body = JSON.stringify({ id: bill.id });
    fetch(`/api/admin/bills`, { method: "DELETE", body })
      .then((res) => {
        if (res.ok) {
          data.bills = data.bills.filter((b) => b.id !== bill.id);
        } else {
          console.error("Failed to delete bill");
        }
      })
      .finally(() => {
        disableAll = false;
        menuKey = -1;
      });
  }

  let disableAll = false;
</script>

<svelte:head>
  <title>Manage Bills</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center p-2">Bills</h1>

<span class="flex flex-row justify-center items-center gap-4 m-4">
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
    Showing {billsToShow.length}
    {showPaid === "both" ? "paid and unpaid" : showPaid} bill{billsToShow.length === 1
      ? ""
      : "s"}
  </span>

  {#if billsToShow.length === 0}
    <h2 class="text-2xl text-center text-white">No bills to show! Yay!</h2>
  {/if}
  {#each billsToShow as bill}
    <BillCard
      {bill}
      markAsPaid={() => markAsPaid(bill)}
      markAsUnpaid={() => markAsUnpaid(bill)}
      deleteBill={() => deleteBill(bill)}
      allowEdit
      bind:menuKey
    />
  {/each}
</div>
