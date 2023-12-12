<template>
    <h3>History</h3>
    <ul id="list" class="list" v-for="transaction in transactions" :key="transaction.id">
        <li :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>${{ transaction.amount }}</span><button class="delete-btn"
                @click="deletedTransaction(transaction.id)">x</button>
        </li>
        <!-- <li class="minus">
            Cash <span>-$400</span><button class="delete-btn">x</button>
        </li>
        <li class="plus">
            Paycheck <span>+$600</span><button class="delete-btn">x</button>
        </li> -->
    </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['transactionDeleted'])

const { transactions } = defineProps({
    transactions: Array,
    required: true
})

const deletedTransaction = (id) => {
    emit('transactionDeleted', id)
}


</script>