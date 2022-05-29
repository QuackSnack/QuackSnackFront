
<script setup lang="ts">
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

</script>

<template>
    <Menubar :model="items">
        <template #start>
        </template>
        <template #end>
            <span class="p-buttonset">
                <Button label="Log in" class="p-button-outlined p-button-secondary"/>
                <Button label="Sign up" />
            </span>
        </template>
    </Menubar>
</template >

<script lang="ts">
export default {
    data() {
        return {
            items: [
                {
                    label: 'Home',
                    to: '/',
                },
            ]
        }
    }
}
</script>
