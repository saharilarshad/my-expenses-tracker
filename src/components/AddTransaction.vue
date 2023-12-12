<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" v-model="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br />
                (negative - expense, positive - income)</label>
            <input type="text" id="amount" v-model="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>

import { ref, defineEmits } from "vue"
import { useToast } from "vue-toastification"

const text = ref("")
const amount = ref("")

const toast = useToast()

const emit = defineEmits(["transactionEmitted"])

const getRandomId = () => { return Math.floor(Math.random() * 10000) }

const onSubmit = () => {
    // console.log(text.value, amount.value)
    if (!text.value || !amount.value) {
        toast.error("must have both of input")
        return
    }

    const transactionData = {
        id: getRandomId(),
        text: text.value,
        amount: parseFloat(amount.value)
    }
    // console.log(transactionData)

    emit("transactionEmitted", transactionData)
    

    text.value = ""
    amount.value = ""

}
</script>