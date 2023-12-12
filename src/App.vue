<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="deleteTransactionEmit" />
    <AddTransaction @transactionEmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from "vue"
import { useToast } from "vue-toastification"

const toast = useToast()

const transactions = ref([])
// const transactions = ref([
//   { id: 1, text: "Flower", amount: -19.90 },
//   { id: 2, text: "Salary", amount: 300.90 },
//   { id: 3, text: "Book", amount: -7.90 },
//   { id: 4, text: "Camera", amount: 119.90 },
// ])

onMounted(() => {
  const savedTransaction = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransaction) {
    transactions.value = savedTransaction
  }
})

//get balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

//get income
const income = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0).toFixed(2)
})

//get expenses
const expenses = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0).toFixed(2)
})

const handleTransactionSubmitted = (transactionData) => {
  console.log(transactionData);

  transactions.value.push({
    id: transactionData.id,
    text: transactionData.text,
    amount: transactionData.amount,
  })
  saveTransaction()
  toast.success("Transaction Added")
}

//delete transaction
const deleteTransactionEmit = (id) => {
  console.log(id);

  transactions.value = transactions.value.filter(fl => fl.id !== id)
  saveTransaction()
  toast.success("Transaction Deleted")
}

//save transactions
const saveTransaction = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}



</script>