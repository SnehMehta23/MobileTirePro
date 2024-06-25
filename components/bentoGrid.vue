<template>
    <div class="container mx-auto px-4 max-w-4xl my-6">
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-red-50 rounded-lg p-6 col-span-2 border border-red-500">
                <div>
                    <NumberedCircle :number="1" />
                    <h6 class="font-bold">Prehead Bold</h6>
                    <span>Detailed Step by Step details of service</span>
                </div>
                <div>
                    <img src="" alt="">
                </div>
            </div>

            <div class="bg-red-50 rounded-lg p-6">
                <div>
                    <NumberedCircle :number="2" />
                    <h6 class="font-bold">Prehead Bold</h6>
                    <span>Detailed Step by Step details of service</span>
                </div>
                <div>
                    <img src="" alt="">
                </div>
            </div>

            <div class="col-span-3 grid grid-cols-2 gap-4">
                <div class="bg-red-50 rounded-lg p-6">
                    <div>
                        <NumberedCircle :number="3" />
                        <h6 class="font-bold">Prehead Bold</h6>
                        <span>Detailed Step by Step details of service</span>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>

                <div class="bg-red-50 rounded-lg p-6 border border-red-500">
                    <div>
                        <NumberedCircle :number="4" />
                        <h6 class="font-bold">Prehead Bold</h6>
                        <span>Detailed Step by Step details of service</span>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NumberedCircle from '~/components/NumberedCircle.vue'
</script>

<style scoped>
/* You can add any additional custom styles here if needed */
</style>