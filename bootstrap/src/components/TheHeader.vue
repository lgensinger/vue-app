<template>
    
    <header>
    
        <b-navbar toggleable="lg" type="dark" variant="info">
    
            <!-- EXAMPLE INFO -->
            <p>name: {{ NAME }}</p>
            <p>version: {{ VERSION }}</p>

            <!-- SERVICES -->
            <p v-for="(service, key) in services"
                v-bind:key="key">{{ key }} service is  

                <!-- STATUS -->
                <span v-if="service.pinged && service.up">online</span>
                <span v-if="service.pinged && !service.up">offline</span>

            </p>

        </b-navbar>
            
    </header>

</template>

<script>    
    import { name, version } from "../../package.json";
    export default {
        name: "TheHeader",
        props: ["services"],
        data: () => ({
            NAME: name,
            VERSION: version
        })
    };
</script>