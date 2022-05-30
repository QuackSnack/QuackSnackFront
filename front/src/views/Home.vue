<script setup lang="ts">
import Galleria from 'primevue/galleria';

</script>

<template>
    <div>
        You're on Home.vue
    </div>
    <Galleria :value="images" :numVisible="3" :circular="true" containerStyle="max-width: 640px"
        :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
        <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 25vw; display: block;" />
        </template>
    </Galleria>
</template>

<script lang="ts">
export default {
    data() {
        return {
            images: [
                {
                    "itemImageSrc": "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F03ab5e89-bad7-4a44-b952-b30c68934215.2Ejpeg/850x478/quality/80/crop-from/center/burger-maison.jpeg",
                    "alt": "Description for Image 1",
                    "title": "Burger"
                },
                {
                    "itemImageSrc": "https://img-3.journaldesfemmes.fr/EIo1RLVcSyvpUiU2ZF4w6ojkaps=/1500x/smart/630e41699895410c9d0c4a4e106de2a3/ccmcms-jdf/11009899.jpg",
                    "alt": "Description for Image 2",
                    "title": "Pizza"
                },
                {
                    "itemImageSrc": "https://www.foodette.fr/files/products/ribs-bbq-web-721x524.jpg",
                    "alt": "Description for Image 3",
                    "title": "Ribs"
                }
            ]
        }
    }
}
</script>